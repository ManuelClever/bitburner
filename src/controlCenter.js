/** @param {NS} ns **/
export async function findHackable(ns, allServers) {
	var hackableServers = new Array(allServers.length);
	var index = 0;

	for(var i = 0; i < allServers.length; i++) {
		var server = allServers[i];
		if(ns.getServerRequiredHackingLevel(server) < ns.getHackingLevel() &&
				server != "darkweb") {
			hackableServers[index] = server;
			index++;
		}
	}
	return shrinkHackable();

	function shrinkHackable() {
		var hackServer = new Array(index);
		for(var i = 0; i < index; i++) {
			hackServer[i] = hackableServers[i];
		}
		return hackServer;
	}
}

export async function hackServer (ns, server) {
	if ( (ns.getServerMoneyAvailable(server) / ns.getServerMaxMoney(server) ) < 0.4) {
		await ns.grow(server);
	} else if (ns.hackAnalyzeChance < 0.75 || ns.getServerSecurityLevel > 25) {
		await ns.weaken(server);
	} else {
		await ns.hack(server);
	}
}