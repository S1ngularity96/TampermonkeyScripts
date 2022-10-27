// ==UserScript==
// @name         FH QIS AverageCalculator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Calculates the average mark from all subjects
// @author       you
// @match        https://www.qis.fh-aachen.de/qisserver/rds?state=notenspiegelStudent*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=fh-aachen.de
// @grant        none
// ==/UserScript==

let excludes = [58990,58200]; // choose modules which to exclude
excludes = new Set(excludes)

function isValidRow(headersLen, row){
    return headersLen === row.querySelectorAll("td").length;
}

function getDataObject(row){
  let tds = row.querySelectorAll("td");
  return {
    "Modulenumber": Number(tds[0].textContent.trim()),
    "Name": tds[1].textContent.trim(),
    "Mark": Number(tds[4].textContent.trim().replace(",",".")),
    "ECTS": Number(tds[5].textContent.trim())
  }
}

function calcAverage(subjects){
    subjects = subjects.filter(subject => !excludes.has(subject.Modulenumber))
    let sumECTS = 0.0;
    let sumMarkDotEcts = 0.0;
    subjects.forEach((subject) => {
        sumECTS += subject.ECTS
        sumMarkDotEcts += subject.ECTS * subject.Mark;
    });
    return Math.ceil(sumMarkDotEcts/sumECTS * 1000) / 1000;
}

function addAverageRow(table , average){
    let tbody = table.querySelector("tbody")
    let tableRow = document.createElement("tr");
    let th = document.createElement("th");
    th.classList.add("tabelleheader");
    th.align = "right";
    th.colSpan = "9";
    th.innerText = `Durchschnitt ${average}`;
    tableRow.appendChild(th);
    tbody.appendChild(tableRow);
}

(function() {
    'use strict';
    let subjects = []
    let table = document.querySelectorAll("table")[1]
    if(typeof table !== "undefined"){
       let rows = table.rows;
       let len = rows.length;
       let headersLen = table.rows[1].querySelectorAll("th").length;
        for(let row = 0; row < len; row++){
           if(isValidRow(headersLen, rows[row])){
               let subject = getDataObject(rows[row]);
               subjects.push(subject)
           }
       }
    }
    let average = calcAverage(subjects);
    addAverageRow(table, average);
})();
