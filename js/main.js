    // selecting loading div
    const loader = document.querySelector("#loading");
    const summary = document.getElementById("summary");
    const button = document.getElementById("buttoncontainer");
    const action = document.getElementById("actiondate");
    const text = document.getElementById("text");
    const title = document.getElementById("titletext");


    // showing loading
    function displayLoading() {
        loader.classList.add("displayloading");
        // to stop loading after some time
        setTimeout(() => {
              loader.classList.remove("displayloading");
        }, 5000);
    }

    // hiding loading 
    function hideLoading() {
        loader.classList.remove("displayloading");
    }

  let count = 0;
  var offset = 0;

async function getBill(mode){
    displayLoading();

    if (count === 19) {
      offset++;
      count = 0;
    }
    
    if (count === 0) {
      const res = await fetch('/bill/' + offset + '/')
      obj = await res.json();
      count++;

      console.log(obj.pagination.next);
    }

    if (mode === 2) {
      count++;
      var titletext = obj.bills[count].title;
      var congress = obj.bills[count].congress;
      var type =  obj.bills[count].type;
      var number = obj.bills[count].number;
      var latestaction = obj.bills[count].latestAction;
    } else {
      var titletext = obj.bills[0].title;
      var congress = obj.bills[0].congress;
      var type =  obj.bills[0].type;
      var number = obj.bills[0].number;
      var latestaction = obj.bills[0].latestAction;
    }
      
    fetch('/summary/'+ congress + '/'+ type.toLowerCase() + '/'+ number + '/')
      .then((response) => response.json())
      .then((summarydata) => {
        console.log(summarydata);
        title.innerHTML = titletext;
        text.innerHTML = 'Text: ' + latestaction.text;
        action.innerHTML = 'Latest Action: ' + latestaction.actionDate;
        summary.innerHTML = summarydata.summaries[0]?.text || "";
      hideLoading();
      button.innerHTML = '<button id="getbillbutton" onclick="getBill(2);">📜 Get another! 📜</button>';
    });

}


    // fetch('https://api.congress.gov/v3/bill?format=json&api_key=bIGjQxkSIlNgX00498tiancQd2mJAEgs4rSaC8DB', {
    //     method: 'GET',
    //     headers: {
    //       'accept': 'application/xml',
    //       'Access-Control-Allow-Origin': 'https://api.congress.gov/'
    //     }
    //   })
    // .then(
    //     (response) => response.json())
    // .then((data) => console.log(data));



