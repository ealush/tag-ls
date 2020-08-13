#!/usr/bin/env node

const { exec } = require("child_process");
const semver = require("semver");

const [repo, tag] = process.argv.slice(2);

exec(
  `git ls-remote --sort=-version:refname --tags git@github.com:${repo}`,
  (err, stdout) => {
    const [last] = stdout.trim().split("\n");
    const [lastTag] = last.split("/").slice(-1);

    console.log(`Latest git tag for ${repo}:`, lastTag);
    console.log(`Provided tag (${tag}) valid:`, !!semver.valid(tag));
    console.log(
      `Provided tag ${
        !!semver.gt(tag, lastTag) ? "IS" : "IS NOT"
      } greater than latest tag`
    );
  }
);
