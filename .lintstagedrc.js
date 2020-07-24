module.exports = {
  '*.{ts,html,md}': ['prettier --write', 'git add'],
  '*.ts': ['eslint --fix', 'git add'],
  '.*{rc,.json}': ['jsonlint  --in-place', 'git add'],
}
