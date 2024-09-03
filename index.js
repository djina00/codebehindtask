// Load data from json
const fs = require('fs');

const groups = JSON.parse(fs.readFileSync('groups.json', 'utf8'));
const exhibitions = JSON.parse(fs.readFileSync('exibitions.json', 'utf8'));

// console.log('Groups Data:', groupsData);
// console.log('Exhibitions Data:', exhibitionsData);

function generateMatchResult(team1Rank, team2Rank) {
    // Generate random result between 60-120
    const minScore = 60;
    const maxScore = 120;

    let randomScore = Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;
    
    const rankDifference = Math.abs(team2Rank - team1Rank);

    if(team1Rank > team2Rank){
        return `${randomScore + rankDifference}-${randomScore}`
    }

    return `${randomScore}-${randomScore + rankDifference}`;
}

function calculatePoints(score){
    const [team1Score, team2Score] = score.split("-").map(Number);

    if(team1Score > team2Score){
        return {team1Points: 2, team2Points : 1}
    }
        return {team1Points: 1, team2Points: 2}    
}

function getTeamPoints(results){
    let teamPoints = {};

    for (let round in results) {
        for (let group in results[round]) {

            if (!teamPoints[group]) teamPoints[group] = [];

            for (let result of results[round][group]) {
                let match = Object.keys(result)[0];
                let score = result[match];
                let [team1, team2] = match.split('-');
                
                if (!teamPoints[group][team1]) teamPoints[group][team1] = 0;
                if (!teamPoints[group][team2]) teamPoints[group][team2] = 0;

                const { team1Points, team2Points } = calculatePoints(score, team1, team2);
                teamPoints[group][team1] += team1Points;
                teamPoints[group][team2] += team2Points;
            }
        }
    }
    let formattedPoints = {};
    for (let group in teamPoints) {
        formattedPoints[group] = Object.keys(teamPoints[group])
            .map(team => ({ team, points: teamPoints[group][team] }))
    }

    return formattedPoints
}

//Simulating results for Group Stage
const resultsGroupStage = {
    "I" : {
        "A" : [
            { "CAN-GRE" : generateMatchResult(
                groups["A"].find(t => t.ISOCode === "CAN").FIBARanking,
                groups["A"].find(t => t.ISOCode === "GRE").FIBARanking
            )},
            { "AUS-ESP" : generateMatchResult(
                groups["A"].find(t => t.ISOCode === "AUS").FIBARanking,
                groups["A"].find(t => t.ISOCode === "ESP").FIBARanking
            )}
        ],
        "B" : [
            { "GER-BRA" : generateMatchResult(
                groups["B"].find(t => t.ISOCode === "GER").FIBARanking,
                groups["B"].find(t => t.ISOCode === "BRA").FIBARanking
            )},
            { "FRA-JPN" : generateMatchResult(
                groups["B"].find(t => t.ISOCode === "FRA").FIBARanking,
                groups["B"].find(t => t.ISOCode === "JPN").FIBARanking
            )}
        ],
        "C" : [
            { "USA-SSD" : generateMatchResult(
                groups["C"].find(t => t.ISOCode === "USA").FIBARanking,
                groups["C"].find(t => t.ISOCode === "SSD").FIBARanking
            )},
            { "SRB-PRI" : generateMatchResult(
                groups["C"].find(t => t.ISOCode === "SRB").FIBARanking,
                groups["C"].find(t => t.ISOCode === "PRI").FIBARanking
            )}
        ]
    },
    "II": {
        "A" : [
            { "CAN-AUS" : generateMatchResult(
                groups["A"].find(t => t.ISOCode === "CAN").FIBARanking,
                groups["A"].find(t => t.ISOCode === "AUS").FIBARanking
            )},
            { "GRE-ESP" : generateMatchResult(
                groups["A"].find(t => t.ISOCode === "GRE").FIBARanking,
                groups["A"].find(t => t.ISOCode === "ESP").FIBARanking
            )}
        ],
        "B" : [
            { "GER-FRA" : generateMatchResult(
                groups["B"].find(t => t.ISOCode === "GER").FIBARanking,
                groups["B"].find(t => t.ISOCode === "FRA").FIBARanking
            )},
            { "BRA-JPN" : generateMatchResult(
                groups["B"].find(t => t.ISOCode === "BRA").FIBARanking,
                groups["B"].find(t => t.ISOCode === "JPN").FIBARanking
            )}
        ],
        "C" : [
            { "USA-SRB" : generateMatchResult(
                groups["C"].find(t => t.ISOCode === "USA").FIBARanking,
                groups["C"].find(t => t.ISOCode === "SRB").FIBARanking
            )},
            { "SSD-PRI" : generateMatchResult(
                groups["C"].find(t => t.ISOCode === "SSD").FIBARanking,
                groups["C"].find(t => t.ISOCode === "PRI").FIBARanking
            )}
        ]
    },
    "III": {
        "A" : [
            { "CAN-ESP" : generateMatchResult(
                groups["A"].find(t => t.ISOCode === "CAN").FIBARanking,
                groups["A"].find(t => t.ISOCode === "ESP").FIBARanking
            )},
            { "AUS-GRE" : generateMatchResult(
                groups["A"].find(t => t.ISOCode === "AUS").FIBARanking,
                groups["A"].find(t => t.ISOCode === "GRE").FIBARanking
            )}
        ],
        "B" : [
            { "GER-JPN" : generateMatchResult(
                groups["B"].find(t => t.ISOCode === "GER").FIBARanking,
                groups["B"].find(t => t.ISOCode === "JPN").FIBARanking
            )},
            { "BRA-FRA" : generateMatchResult(
                groups["B"].find(t => t.ISOCode === "BRA").FIBARanking,
                groups["B"].find(t => t.ISOCode === "FRA").FIBARanking
            )}
        ],
        "C" : [
            { "USA-PRI" : generateMatchResult(
                groups["C"].find(t => t.ISOCode === "USA").FIBARanking,
                groups["C"].find(t => t.ISOCode === "PRI").FIBARanking
            )},
            { "SRB-SSD" : generateMatchResult(
                groups["C"].find(t => t.ISOCode === "SRB").FIBARanking,
                groups["C"].find(t => t.ISOCode === "SSD").FIBARanking
            )}
        ]
    }
};

//console.log(JSON.stringify(resultsGroupStage, null, 2));

//Printing Results for Group Stage

for(let round in resultsGroupStage){
    console.log(`Grupna faza - ${round} kolo:`);
    for(let group in resultsGroupStage[round]){
        console.log(`\tGrupa ${group}:`);
        for(let result of resultsGroupStage[round][group]){
            let match = Object.keys(result)[0];
            let score = result[match];           
            console.log(`\t\t${match}: ${score}`);
        }
    }
}

//Results after Group Stage
let teamPointsByGroupAfterGroupStage = getTeamPoints(resultsGroupStage);
//console.log(teamPointsByGroupAfterGroupStage);

function rankByGroups() {
    let rank = {};

    for (let group in teamPointsByGroupAfterGroupStage) {
        let teams = teamPointsByGroupAfterGroupStage[group];
        teams.sort((a, b) => b.points - a.points);

        let sortedTeams = [];
        let teamsWithSamePoints = [];
        let previousTeam = {};

        for (let team of teams) {
            if (previousTeam.points && team.points === previousTeam.points) {
                teamsWithSamePoints.push(previousTeam)
            } else {
                
                if (teamsWithSamePoints.length == 2) {
                    teamsWithSamePoints.sort((t1, t2) => {
                        
                        let score = getScore(t1, t2);
                        let [team1Score, team2Score] = score.split('-').map(Number);
                        if (team1Score > team2Score) {
                            return -1;
                        } else if (team1Score < team2Score) {
                            return 1;
                        } else {
                            return 0; 
                        }
                       
                    });
                    sortedTeams.push(...teamsWithSamePoints);
                }else if(teamsWithSamePoints.length == 3){
                    
                    teamsWithSamePoints.sort((t1,t2) => {
                        let score = getScore(t1, t2);
                        let [team1Score, team2Score] = score.split("-").map(Number);
                        return team1Score - team2Score;
                    })
                }else {
                    sortedTeams.push(...teamsWithSamePoints);
                }
            }
            previousTeam = team;
        }        
        rank[group] = sortedTeams;
    }
    return rank;
};



function getScore(team1, team2){
    for (let round in resultsGroupStage) {
        for (let group in resultsGroupStage[round]) {
            for (let match of resultsGroupStage[round][group]) {
                let matchName = Object.keys(match)[0];
                if ((matchName.includes(team1) && matchName.includes(team2)) ||
                    (matchName.includes(team2) && matchName.includes(team1))) {
                    return match[matchName];
                }
            }
        }
    }
    return null;
}
// function getTeam(teamName){
//     for (let group in groups) {
//         let team = groups[group].find(t => t.ISOCode === teamName) ?? null;
//         if (team) {
//             return team;
//         }
//     }
//     return null;
// }

let rankedTeams = rankByGroups();
// console.log("Trazeni tim: ")
// console.log(getTeam("AUS"))
console.log(rankedTeams)


