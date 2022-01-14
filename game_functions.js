const fs = require("fs");
const { endHour } = require("./gameconfg.json");
module.exports = {

    validVote: function (votee, members) {
        let date = new Date();
        let hr = date.getHours();
        if (hr >= endHour) {
            return false;
        }
        if(!members.hasOwnProperty(votee)){
            return false;
        }
        return true;
    },

    saveMembers: function (playerIDs, playerNames) {
        let players = {}
        for (let i = 0; i < playerIDs.length; i++) {
            players[playerIDs[i]] = playerNames[i]
        }
        fs.writeFileSync("players.json", JSON.stringify(players));
        this.generateMain();
    },

    getMembers: function () {
        let input = fs.readFileSync("players.json");
        let members = JSON.parse(input);
        console.log(members);
        return members; //Key is id, value is nickname
    },

    removeMember: function (name) {
        let temp = names;
        names = [];
        for (i = 0; i < temp.length; i++) {
            if (temp[i] != name) {
                names.push(temp[i]);
            }
        }
    },

    generateMain: function () {
        votes = {};
        members = this.getMembers();
        for (id in members) {
            votes[id] = [];
        }
        votes["voted"] = [];
        fs.writeFileSync("votes.json", JSON.stringify(votes));
    },

    addVote: function (votee, voter, votes, members) {
        if (votes["voted"].includes(voter)) {
            for (id in members) {
                if (votes[id].includes(voter)) {
                    let name = id;
                    let index = votes[id].indexOf(voter);
                    votes[id][index] = "";
                    for (j = index; j < votes[id].length - 1; j++) {
                        votes[id][j] = votes[id][j + 1];
                    }
                    votes[name][j] = "";
                }
            }
        } else {
            votes["voted"].push(voter);
        }

        votes[votee].push(voter);
        fs.writeFileSync("votes.json", JSON.stringify(votes));
        return votes;

    },

    countVotes: function (votes, members) {
        let counts = {};
        for(id in members){
            let count = 0;
            for (j = 0; j < votes[id].length; j++) {
                if (votes[id][j] != "") {
                    count++;
                }
            }
            if (count != 0) {
                counts[id] = count;
            }
        }
        return counts;
    },

    voteResults: function(votes,counts,members){
        let output = "";
        for(id in counts){
            output += counts[id].toString();
            output += " vote(s) for ";
            output += members[id];
            output += "("
            for(let i = 0; i<votes[id].length; i++){
                output += members[votes[id][i]] +", "
            }
            output += ")\n"
        }
        return output;
    },

    recordVote: function (votee, voter) {
        let members = {};
        members = this.getMembers();
        let legit = this.validVote(votee, members);
        if (!legit) {
            return "Invalid vote";
        }
        let input = fs.readFileSync("votes.json");
        let votes = JSON.parse(input);
        votes = this.addVote(votee, voter, votes, members);
        let counts = this.countVotes(votes, members);
        let output = "";
        output = this.voteResults(votes, counts, members);
        console.log(output);
        return output;

    }
}