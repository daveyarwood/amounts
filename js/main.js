// source: https://stackoverflow.com/a/2880929/2338327
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);
})();

$content = $('#content');

function main() {
  try {
    if (!urlParams.total)
      throw Error('"total" query parameter is missing.');

    if (isNaN(urlParams.total))
      throw Error('"total" query parameter is not a number.');

    var total = Number(urlParams.total);

    var totalIncome = 0;
    var people = {};

    for (person in urlParams) {
      if (person != 'total') {
        var salary = urlParams[person];
        if (isNaN(salary)) throw Error(person + "'s salary is not a number.");

        salary = Number(salary);
        totalIncome += salary;

        var record = {};
        record.salary = salary;

        people[person] = record;
      }
    }

    for (person in people) {
      var p = people[person];
      p.percentage = Math.round((p.salary / totalIncome) * 100);
      p.share = Math.round(total * (p.percentage / 100));
    }

    // Render results
    var table = $(document.createElement('table'));
    table.append('<tr><td>Total</td><td>$' + total + '</td></tr>');
    for (person in people) {
      var p = people[person];
      table.append('<tr><td>' + person +
                   '</td><td>$' + p.share +
                   ' (' + p.percentage + '%)</td></tr>');
    }
    $content.append(table);

  } catch (e) {
    console.error(e.message);
    $content.empty();
    $content.append('<h2 class="error">' + e.message + '</div>');
  }

}

main();
