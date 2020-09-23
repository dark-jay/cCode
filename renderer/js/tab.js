
function addTab(contents, fileName) {
    var html = "";
    if (fileName) {
        html = `
            <button class="btn-tab-name" id="btn-${tabId}" onclick="javascript:openSelectedTab(this); return false;">${fileName}</button>
            <button class="btn-tab-close" id="btn-tab-close-${tabId}" onclick="javascript:removeElement(this); return false;">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
        `;
    }
    else {
        html = `
            <button class="btn-tab-name" id="btn-${tabId}" onclick="javascript:openSelectedTab(this); return false;">Newfile${tabId}</button>
            <button class="btn-tab-close" id="btn-tab-close-${tabId}" onclick="javascript:removeElement(this); return false;">
                <i class="fa fa-times" aria-hidden="true"></i>
            </button>
        `;
    }
    addElement('ul-tab', 'li', 'file' + tabId, html);
    // if will exxecute when new tab button will pressed
    if (contents === undefined && fileName === undefined) {
        editors[tabId] = ace.createEditSession(tabId.toString(), "ace/mode/c_cpp"); // remove first arg in deployment
        
        var tempSingleTabDetail = {};
        tempSingleTabDetail["path"] = "";
        tempSingleTabDetail["pathPure"] = "";
        tempSingleTabDetail["tabId"] = tabId;
        tempSingleTabDetail["isStored"] = 0; // 0 means No
        allOpenedTabsDetail[tabId] = tempSingleTabDetail;

        currCodePath = "";
        currCodePathPure = "";
    }
    else {
        editors[tabId] = ace.createEditSession(contents.toString(), "ace/mode/c_cpp");
    }
    codeEditor.setSession(editors[tabId]);
    codeEditor.focus();
    codeEditor.navigateFileEnd();

    // remove bg of previous tab only if its not the first init tab
    if (currTabId != undefined) {
        var prevTabId = 'file' + parseInt(currTabId);
        document.getElementById(prevTabId).style.background = "transparent";
        // remove the cross from the last selected tab
        var buttonClose = "btn-tab-close-" + currTabId;
        document.getElementById(buttonClose).style.display = "none";
    }

    currTabId = tabId;
    tabId++;
    totNumOfTab++;

    // modify the bg of new selected tab
    var currTabIdName = 'file' + parseInt(currTabId);
    document.getElementById(currTabIdName.toString()).style.background = "rgb(20, 20, 20)";
    // display the cross of the selected tab
    var buttonClose = "btn-tab-close-" + currTabId;
    document.getElementById(buttonClose).style.display = "table-cell";
}

function addElement(parentId, elementTag, elementId, html) {
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    //newElement.setAttribute('onclick', `javascript:openSelectedTab("${elementId}"); return false;`); // elementId = tabId
    newElement.setAttribute('onmouseover', `javascript:tabMouseOver("${elementId}");`); // elementId = tabId
    newElement.setAttribute('onmouseout', `javascript:tabMouseOut("${elementId}");`); // elementId = tabId
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function removeElement(input) { 
    var parentId = document.getElementById('ul-tab');
    parentId.removeChild(input.parentNode);
    
    var idName = input.parentNode.id; //file0
    var idNumStr = idName.slice(4, 5);
    var tabNum = parseInt(idNumStr);
    console.log(tabNum);
    
    // if there only one tab left then remove this tab and open a new tab
    if (totNumOfTab === 1) {
        totNumOfTab--;
        removeTab(tabNum);
        currTabId = undefined;
        // after all this add a new tab
        addTab();
    }
    else if (totNumOfTab > 1){
        // check the left adjacent tab
        var i = tabNum - 1;
        while (i >= 0) {
            if (editors[i]) {
                break;
            }
            i--;
        }
        if (i >= 0) {
            removeTab(tabNum);
            totNumOfTab--;
            if (currTabId === tabNum) { // current tab has been removed if true
                currTabId = i;
                codeEditor.setSession(editors[currTabId]);
                var currTabIdName = 'file' + parseInt(currTabId);
                // modify the bg of new auto activated tab
                document.getElementById(currTabIdName).style.background = "rgb(20, 20, 20)";
                // display the cross of the selected tab
                var buttonClose = "btn-tab-close-" + currTabId;
                document.getElementById(buttonClose).style.display = "table-cell";
            }
        }
        else {
            // check the right adjacent tab
            var i = tabNum + 1;
            while (i <= tabId) {
                if (editors[i]) {
                    break;
                }
                i++;
            }
            if (i <= tabId) {
                removeTab(tabNum);
                totNumOfTab--;
                if (currTabId === tabNum) { // current tab has been removed if true
                    currTabId = i;
                    codeEditor.setSession(editors[currTabId]);
                    var currTabIdName = 'file' + parseInt(currTabId);
                    // modify the bg of new auto activated tab
                    document.getElementById(currTabIdName).style.background = "rgb(20, 20, 20)";
                    // display the cross of the selected tab
                    var buttonClose = "btn-tab-close-" + currTabId;
                    document.getElementById(buttonClose).style.display = "table-cell";
                }
            }
        }
    }
    console.log('current tab id = ' + currTabId);
}

function removeTab(tabNumber) {
    // remove logic (not yet implemented)
        // first check if unsaved or saved file,
        // if saved then save and remove
        // if unsaved then check if there is anything in the editor
        // if yes, prompt for save
        // if no, no need to do anything just remove
    editors[tabNumber] = undefined;
    console.log('Removed tab is: ' + tabNumber);
    allOpenedTabsDetail[tabNumber] = undefined; // In any case if errors occurs with index, them search array by object "tabId"
}

function openSelectedTab(input) { 
    var idName = input.parentNode.id; //file0

    // remove bg of previous tab
    var prevTabId = 'file' + parseInt(currTabId);
    document.getElementById(prevTabId).style.background = "transparent";
    // remove the cross from the last selected tab
    var buttonClose = "btn-tab-close-" + currTabId;
    document.getElementById(buttonClose).style.display = "none";

    var idNumStr = idName.slice(4, 5);
    var tabNum = parseInt(idNumStr);
    codeEditor.setSession(editors[tabNum]);
    // code to modify vars that represent current tab: 
    currTabId = tabNum;
    currCodePathPure = allOpenedTabsDetail[currTabId].pathPure;
    currCodePath = allOpenedTabsDetail[currTabId].path;

    // modify the bg of new selected tab
    console.log('id name: ' + idName);
    document.getElementById(idName.toString()).style.background = "rgb(20, 20, 20)";
    // display the cross of the selected tab
    var buttonClose = "btn-tab-close-" + currTabId;
    document.getElementById(buttonClose).style.display = "table-cell";
}

function tabMouseOver(tabId) {
    //var idName = input.parentNode.id; //file7
    console.log("hovered tab is: " + tabId);
    var idNumStr = tabId.slice(4, 5); // '7'
    var tabNum = parseInt(idNumStr); // 7
    var buttonClose = "btn-tab-close-" + tabNum;
    if (tabNum != currTabId) { // if curr tab then leave as it is
        document.getElementById(tabId).style.background = "rgb(20, 20, 20)";
        document.getElementById(buttonClose).style.display = "table-cell";
    }
}

function tabMouseOut(tabId) {
    //var idName = input.parentNode.id; //file0
    var idNumStr = tabId.slice(4, 5);
    var tabNum = parseInt(idNumStr);
    var buttonClose = "btn-tab-close-" + tabNum;
    if (tabNum != currTabId) { // if curr tab then leave as it is
        document.getElementById(tabId).style.background = "transparent";
        document.getElementById(buttonClose).style.display = "none";
    }
}


//btn-tab-close-${tabId} btn-tab-close-5
