require("dotenv").config();
const fs = require("fs");
const path = require("path");
const iconv = require("iconv-lite");
const { parse } = require("csv-parse/sync");
const { db } = require("../src/config");

(async () => {
  try {
    // 0) abort if there’s data
    const [{ count }] = await db("rewards").count("reward_id as count");
    if (+count > 0) {
      console.log('⚠️  Table "rewards" already has data. Aborting.');
      process.exit(0);
    }

    // 1) load file as UTF-8
    const filePath = path.resolve(__dirname, "rewards.csv");
    let content = fs.readFileSync(filePath, "utf8");

    // 2) strip any BOM
    content = content.replace(/^\uFEFF/, "");

    // 3) parse with semicolons and relaxed quoting
    const records = parse(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
      delimiter: ",",
      relax_quotes: true,
    });

    // 4) map + insert
    const now = new Date();
    const toInsert = records.map((r, idx) => ({
      reward_id:  idx + 1,
      type:       r.Type,
      name:       r.Name,
      description:r.Description,
      created_at: now
    }))

    await db("rewards").insert(toInsert);
    console.log(`✔ Inserted ${toInsert.length} rows into rewards.`);
  } catch (err) {
    console.error("✖ Seeding failed:", err);
    process.exit(1);
  } finally {
    await db.destroy();
  }
})();
