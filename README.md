# amounts

Calculates the monthly amounts that each person should put into a joint account
based on their salaries.

## Usage

* Open index.html in browser.

* Include `?total=XXXX` in the query string. This is the total shared amount
  that you owe each month.

* Supply one or more additional key/value pairs as query string parameters. Each
  key is someone's name, and the value is that person's yearly salary.

  Before vs. after tax doesn't matter, provided that it's consistent for each
  person. We just need to determine the ratio in order to calculate monthly
  amounts.
