require("dotenv").config();
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const { parse } = require("csv-parse/sync");
const { db } = require("../src/config");

(async () => {
  try {
    const now = new Date();

    // ─── 0) Check if rewards is already seeded ───────────────────────────────────
    const [{ count: rewardCount }] = await db("rewards").count(
      "reward_id as count"
    );
    if (+rewardCount > 0) {
      console.log(
        '⚠️  Table "rewards" already has data. Skipping rewards seed.'
      );
    } else {
      // ─── 1) Load & parse rewards.csv ─────────────────────────────────────────────
      const rewardsCsv = path.resolve(__dirname, "rewards.csv");
      let rewardsContent = fs.readFileSync(rewardsCsv);
      // if your file is encoded in something else (e.g. windows-1252), do:
      // rewardsContent = iconv.decode(rewardsContent, "windows-1252");
      rewardsContent = rewardsContent.toString("utf8").replace(/^\uFEFF/, "");

      const rewardRows = parse(rewardsContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        delimiter: ",",
        relax_quotes: true,
      });

      // ─── 2) Map & insert into rewards ────────────────────────────────────────────
      const rewardsToInsert = rewardRows.map((r, idx) => ({
        reward_id: idx + 1,
        type: r.Type,
        name: r.Name,
        description: r.Description,
        created_at: now,
      }));

      await db("rewards").insert(rewardsToInsert);
      console.log(`✔️  Inserted ${rewardsToInsert.length} rows into rewards.`);
    }

    // ─── 3) Check if criteria is already seeded ─────────────────────────────────
    const [{ count: criteriaCount }] = await db("criteria").count(
      "criterion_id as count"
    );
    if (+criteriaCount > 0) {
      console.log('⚠️  Table "criteria" already has data. Aborting.');
      process.exit(0);
    }

    // ─── 4) Load & parse criteria.csv ───────────────────────────────────────────
    const criteriaCsv = path.resolve(__dirname, "criteria.csv");
    let criteriaContent = fs.readFileSync(criteriaCsv);
    criteriaContent = criteriaContent.toString("utf8").replace(/^\uFEFF/, "");

    const criteriaRows = parse(criteriaContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      delimiter: ",",
      relax_quotes: true,
    });

    // log parsed values to verify
    /* criteriaRows.forEach((r, i) => {
      const raw = JSON.stringify(r.reward_id);
      const parsed = parseInt(r.reward_id, 10);
      console.log(`Row ${i + 1} → raw: ${raw}, parseInt: ${parsed}`);
    }); */

    // ─── 4.1) Filter out rows with reward_id ≤ 0 ────────────────────────────────
    const filteredCriteriaRows = criteriaRows.filter((r, idx) => {
      const raw = String(r.reward_id)
        .trim()
        .replace(/^"+|"+$/g, "");
      const id = parseInt(raw, 10);
      if (id <= 0) {
        console.log(
          `ℹ️  Skipping row ${idx + 1} with invalid reward_id: "${r.reward_id}"`
        );
        return false;
      }
      return true;
    });

    // ─── 5) Validate reward_id foreign keys ─────────────────────────────────────
    const csvRewardIds = new Set();
    filteredCriteriaRows.forEach((r, idx) => {
      const id = parseInt(r.reward_id, 10);
      csvRewardIds.add(id);
    });

    const existingRewardIds = await db("rewards")
      .whereIn("reward_id", [...csvRewardIds])
      .pluck("reward_id");

    const missing = [...csvRewardIds].filter(
      (id) => !existingRewardIds.includes(id)
    );

    if (missing.length) {
      throw new Error(
        `Foreign key check failed. reward_id(s) not found in rewards: ${missing.join(
          ", "
        )}`
      );
    }

    // ─── 6) Map & insert into criteria ──────────────────────────────────────────
    const counters = {};
    const criteriaToInsert = criteriaRows.map((r) => {
      const rewardId = parseInt(r.reward_id, 10);

      // bump the per‐reward counter
      counters[rewardId] = (counters[rewardId] || 0) + 1;

      return {
        criterion_id: rewardId * 1000 + counters[rewardId],
        reward_id: rewardId,
        name: r.name,
        description: r.description,
        created_at: now,
        priority_level: parseInt(r.priority_level, 10),
      };
    });

    // ─── 7) Detect duplicate (reward_id,name) keys
    const seen = new Map(); // key → firstRowIndex
    const duplicates = [];

    criteriaToInsert.forEach((row, i) => {
      const key = `${row.reward_id}|${row.name}`;
      if (seen.has(key)) {
        duplicates.push({
          firstRow: seen.get(key) + 1,
          dupRow: i + 1,
          reward_id: row.reward_id,
          name: row.name,
        });
      } else {
        seen.set(key, i);
      }
    });

    if (duplicates.length) {
      console.error("✖ Duplicate (reward_id,name) found in CSV:");
      duplicates.forEach((d) => {
        console.error(
          `  • rows ${d.firstRow} & ${d.dupRow} → ` +
            `(reward_id=${d.reward_id}, name="${d.name}")`
        );
      });
      process.exit(1);
    }

    await db("criteria").insert(criteriaToInsert);
    console.log(`✔️  Inserted ${criteriaToInsert.length} rows into criteria.`);
  } catch (err) {
    console.error("✖ Seeding failed:", err.message || err);
    process.exit(1);
  } finally {
    await db.destroy();
  }
})();
