/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/
const puppeteer = require("puppeteer");

const accountsService = require('../services/accounts.service');

const get = function(req, res){
    res.send(accountsService.get(req.params._id));
}

const getAll = async function(req, res){
    console.log(req, req.body);
    var resuh = await test(`https://www.mister-auto.it/nwsAjax/Plate?captcha_token=${req.body.token}&family_id=0&generic_id=0&category_id=0&locale=it_IT&device=desktop&pageType=homepage&country=IT&lang=it&captchaVersion=v2&plate_selector_vof=&immatriculation=${req.body.plate}`);
    res.send(resuh);
}


const test = async (url) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle0' })

    const pagedata = await page.evaluate(() => {
        // Get the displayed text and returns it
        const pageList = document.getElementsByTagName("pre")[0].innerText;   
        return pageList;
    });
    await browser.close(); 
    return pagedata;
}

module.exports = {
    get,
    getAll
};