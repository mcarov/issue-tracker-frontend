async function getIssues() {
    try {
        const reply = await fetch('http://localhost:8080/api/issues');
        const data = await reply.json();
        console.log(data);
        createTableBody(data);
    }
    catch (e) {
        console.error(e);
    }
}

async function searchForIssues(query) {
    try {
        const reply = await fetch(`http://localhost:8080/api/search/issues?q=${query}`);
        const data = await reply.json();
        console.log(data);
        createTableBody(data);
    }
    catch (e) {
        console.error(e);
    }
}

function createTableBody(data) {
    const table = document.getElementById("table");
    const tbody = document.createElement('tbody');
    for(const i of data) {
        let tr = document.createElement('tr');

        let td = document.createElement('td');
        let textNode = document.createTextNode(i.id);
        td.appendChild(textNode);
        tr.appendChild(td);

        td = document.createElement('td');
        textNode = document.createTextNode(i.title);
        td.appendChild(textNode);
        tr.appendChild(td);

        td = document.createElement('td');
        textNode = document.createTextNode(i.description);
        td.appendChild(textNode);
        tr.appendChild(td);

        td = document.createElement('td');
        textNode = document.createTextNode(new Date(i.date).toISOString().slice(0, 19).replace('T', ' '));
        td.appendChild(textNode);
        tr.appendChild(td);

        td = document.createElement('td');
        textNode = document.createTextNode(i.votes);
        td.appendChild(textNode);
        tr.appendChild(td);

        td = document.createElement('td');
        let labelTitles = i.labels.map(function(label) {
            return label.title;
        });
        textNode = document.createTextNode(labelTitles.join(', '));
        td.appendChild(textNode);
        tr.appendChild(td);

        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
}

getIssues();