async function getIssues() {
    try {
        const reply = await fetch('http://localhost:8080/api/issues');
        const data = await reply.json();
        console.log(data);
        let out = '';
        for(const i of data) {
            out += i.title+' '+i.description+'<br/>'+'labels: ';
            for (const j of i.labels) {
                out += ' '+j.title;
            }
            out += '<br/>'
        }
        const root = document.getElementById("root");
        root.innerHTML = out;
    }
    catch (e) {
        console.error(e);
    }
}

getIssues();