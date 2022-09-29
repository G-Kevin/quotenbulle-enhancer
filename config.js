var orbitLandingDomain = "orbitxch.com"; // URL deiner Wettbörse
var orbitCommission = "3"; // Wie viel Prozent Commission hat dein Orbit-Account?
var orbitCommissionOnWinnings = true; // Wird die Orbit-Commission nur auf Gewinne angerechnet?
var orbitNameInExcel = "Orbit"; // Name der Wettbörse in der Excel

// Wie heißen die Buchmacher in deiner Excel?
const lookupBookiesExcel = {
	"10bet" : "",
	"12bet" : "",
	"18bet" : "",
	"1xbet" : "",
	"20bet" : "",
	"22bet" : "",
	"888sport" : "888sport",
	"admiral" : "AdmiralBet",
	"anonymbet" : "",
	"b_bets" : "",
	"babibet" : "",
	"bet11" : "",
	"bet3000" : "bet3000",
	"bet365" : "bet365",
	"bet777" : "",
	"bet90" : "",
	"bet_at_home" : "bet-at-home",
	"betadonis" : "",
	"betago" : "Betago",
	"betano" : "Betano",
	"betclic" : "",
	"betfair" : "",
	"betfinal" : "",
	"betfirst" : "",
	"betfive" : "",
	"betgold" : "",
	"bethard" : "",
	"betinia" : "",
	"betkeen" : "",
	"betmaster" : "",
	"betolimp" : "",
	"betsafe" : "",
	"betser" : "",
	"betsson" : "betsson",
	"betstars" : "",
	"betvictor" : "",
	"betway" : "betway.com",
	"betwinner" : "",
	"betworld" : "",
	"bgbetworld" : "",
	"bildbet" : "bildBet",
	"bpremium" : "bpremium.de",
	"btty" : "",
	"bwin" : "bwin",
	"campeonbet" : "Campeonbet",
	"campobet" : "",
	"cashpoint" : "",
	"cbet" : "Cbet",
	"cherry_casino": "",
	"comeon" : "ComeOn!",
	"cyberbet" : "",
	"digibet" : "",
	"double_bet" : "",
	"eaglebet" : "Eaglebet",
	"easysportbet" : "",
	"energybet" : "Energybet  (AT)",
	"evobet" : "",
	"expekt" : "",
	"fansbet" : "Fansbet (AT)",
	"fastbet" : "",
	"fezbet" : "",
	"gambola" : "",
	"guts" : "",
	"hopa" : "",
	"hpybet" : "HappyBet",
	"ibet" : "",
	"intertops" : "Intertops",
	"interwetten" : "Interwetten",
	"jackone" : "Jackone",
	"jaxx" : "Jaxx",
	"karamba" : "",
	"ladbrokes" : "Ladbrokes",
	"lapilanders" : "",
	"leonbet" : "LeonBet (AT)",
	"leo_vegas" : "LeoVegas",
	"librabet" : "",
	"lsbet" : "LSBet",
	"lvbet" : "",
	"malina" : "Malina",
	"mansionbet" : "",
	"mobilebet" : "Mobilebet",
	"moplay" : "",
	"mr_green" : "MrGreen (AT)",
	"mybet" : "mybet.de",
	"neo_bet" : "NeoBet",
	"netbet" : "Netbet (AT)",
	"ninecasino" : "Ninecasino",
	"nordicbet" : "",
	"novibet" : "Novibet",
	"noxwin" : "Noxwin",
	"players_olymp" : "",
	"rabona" : "",
	"redbet" : "",
	"reloadbet" : "ReloadBet",
	"rivalo" : "",
	"rizk" : "",
	"royal_oak" : "",
	"runbet" : "",
	"scandibet" : "",
	"schnellwetten" : "",
	"skybet" : "Skybet (AT)",
	"slott" : "SlottClub",
	"spin_palace" : "",
	"spin_sports" : "",
	"sportaza" : "",
	"sportingbet" : "Sportingbet",
	"sportwetten_de" : "Sportwetten.de",
	"star" : "",
	"stsbet" : "",
	"sunmaker" : "Sunmaker",
	"sunny-player" : "Sunnyplayer",
	"sunnyplayer" : "Sunnyplayer",
	"svenbet" : "SvenBet",
	"tipbet" : "",
	"tipico" : "Tipico",
	"tipp3" : "tipp3 (AT)",
	"tipster" : "Tipster",
	"tiptorro" : "TipTorro",
	"tipwin" : "TipWin",
	"titanbet" : "",
	"tonybet" : "Tonybet (AT)",
	"unibet" : "unibet.de (AT)",
	"unikrn" : "unikrn",
	"vbet" : "vBet",
	"vierklee" : "vierklee (AT)",
	"vollsports" : "",
	"volltreffer" : "",
	"wallacebet" : "Wallacebet",
	"wettarena" : "Wettarena",
	"wetten_com" : "",
	"wetten_tv" : "",
	"william_hill" : "WilliamHill (AT)",
	"winamax" : "Winamax",
	"winmasters" : "",
	"wirwetten" : "wirwetten (AT)",
	"wsbet" : "",
	"xtip" : "XTIP",
	"yobetit" : "",
	"yonibet" : "YoniBet",
	"zulabet" : "",
}