
const begin = document.querySelector(".begin");
const board = document.querySelector(".board");
const control = document.querySelector(".control");
const playAgainBtn = document.querySelector('.control__button')
const pgr = document.querySelector(".control__time");
const timeTxt = document.querySelector("time")

// Load game
function Loaded() {
	let tbody = document.querySelector("tbody");
	let row = document.getElementsByClassName("row");
	let square = document.getElementsByClassName("square");
	let imgp = document.querySelector(".control__imgPlayer");
	playAgainBtn.style.display = "none"

	if (CPlayer === 0) {
		imgp.style.backgroundImage = "url('./Images/Opng.png')";
	} else if (CPlayer === 1) {
		imgp.style.backgroundImage = "url('./Images/Xpng.png')";
	}

	// Create Table
	tbody.innerHTML = "";
	for (y = 0; y < size; y++) {
		tbody.innerHTML += '<tr class="row g-1"></tr>';
		for (x = 0; x < size; x++) {
			let div = '<div class="square" onClick="Click(id)"></div>';
			row.item(y).innerHTML += '<td class="col">' + div + '</td>';
			square.item(x + y * size).setAttribute("id", (x + y * size).toString());
			square.item(x + y * size).setAttribute("player", "-1");
		}
	}
}

// End game
function endGame() {
	playAgainBtn.style.display = "block"
	InGame = false
}

// Button click
function playAgain() {
	CPlayer = 1
	timeRun = timeDefault
	begin.style.display = 'flex'
	board.style.display = 'none'
	control.style.display = 'none'
}

function PvsP() {
	PlayerReturn()
	AI = false
	isClicks = true
	InGame = true
	begin.style.display = 'none'
	board.style.display = 'block'
	control.style.display = 'flex'
	Loaded();

	pgr.setAttribute("max", timeDefault / 100)
	pgr.value = pgr.getAttribute("max");
	let isLoadedProgress = LoadProgress()
	if (isLoadedProgress === 1) {
		pgr.style.display = 'none'
		timeTxt.style.display = 'none'
	} else {
		pgr.style.display = 'block'
		timeTxt.style.display = 'block'
	}
}

function PvsM() {
	PlayerReturn()
	InGame = true
	isClicks = true
	AI = true
	begin.style.display = 'none'
	board.style.display = 'block'
	control.style.display = 'flex'
	Loaded();
	pgr.setAttribute("max", timeDefault / 100)
	pgr.value = pgr.getAttribute("max");
	let isLoadedProgress = LoadProgress()
	if (isLoadedProgress === 1) {
		pgr.style.display = 'none'
		timeTxt.style.display = 'none'
	} else {
		pgr.style.display = 'block'
		timeTxt.style.display = 'block'
	}
}

function MvsM() {
	PlayerReturn()
	InGame = true;
	isClicks = false;
	AI = true;
	begin.style.display = 'none'
	board.style.display = 'block'
	control.style.display = 'flex'
	Loaded();
	pgr.setAttribute("max", timeDefault / 100)
	pgr.value = pgr.getAttribute("max");
	let isLoadedProgress = LoadProgress()
	if (isLoadedProgress === 1) {
		pgr.style.display = 'none'
		timeTxt.style.display = 'none'
	} else {
		pgr.style.display = 'block'
		timeTxt.style.display = 'block'
	}
	PlayMvsM()
}

function PlayMvsM() {
	const delay = 1000
	if (!InGame && isClicks && !AI) return
	let win = WinGame()
	if (!win) {

		let iplayer = "url('Images/Opng.png')";
		if (CPlayer == 1) iplayer = "url('Images/Xpng.png')";
		let imgp = document.querySelector(".control__imgPlayer");
		imgp.style.backgroundImage = iplayer;
		setTimeout(() => {
			AIMode(CPlayer,1);
			pwin = CPlayer;
			win = WinGame();
			if (win) {
				let mess = 'Player with "X" win';
				if (pwin == 0) mess = 'Player with "O" win';
				if (pwin === -1) mess = 'Hòa';
				alert(mess)
				endGame()
			}
			if (CPlayer == 0) CPlayer = 1;
			else CPlayer = 0;
			PlayMvsM()
		}, delay)
	}
}

function Click(id) {
	if (!InGame || !isClicks) return;
	let square = document.getElementsByClassName("square");
	let pos = parseInt(id);
	// kiểm tra xem ô còn trống hay đã đc đánh
	if (square.item(pos).getAttribute("player") != "-1") return;
	// 
	let path = "url('Images/Opng.png')";
	if (CPlayer == 1) path = "url('Images/Xpng.png')";
	square.item(pos).style.backgroundImage = path;
	square.item(pos).setAttribute("player", CPlayer.toString());
	l_played.push(pos);
	square.disabled = true;
	pwin = CPlayer;
	let win = WinGame();

	if (!AI) {
		if (CPlayer == 0) CPlayer = 1;
		else CPlayer = 0;
		let iplayer = "url('Images/Opng.png')";
		if (CPlayer == 1) iplayer = "url('Images/Xpng.png')";
		let imgp = document.querySelector(".control__imgPlayer");
		imgp.style.backgroundImage = iplayer;
	}
	else {
		if (!win) {
			if (CPlayer == 0) CPlayer = 1;
			else CPlayer = 0;
			let iplayer = "url('Images/Opng.png')";
			if (CPlayer == 1) iplayer = "url('Images/Xpng.png')";
			let imgp = document.querySelector(".control__imgPlayer");
			imgp.style.backgroundImage = iplayer;
			setTimeout(() => {
				AIMode(CPlayer);
				win = WinGame();
				pwin = CPlayer;
				if (CPlayer == 0) CPlayer = 1;
				else CPlayer = 0;
				iplayer = "url('Images/Opng.png')";
				if (CPlayer == 1) iplayer = "url('Images/Xpng.png')";
				imgp = document.querySelector(".control__imgPlayer");
				imgp.style.backgroundImage = iplayer;
				if (win) {
					let mess = 'Player with "X" win';
					if (pwin == 0) mess = 'Player with "O" win';
					if (pwin === -1) mess = 'Hòa';
					alert(mess)
					endGame()
				}
			}, botDelay)
		}
	}

	if (win) {
		let mess = 'Player with "X" win';
		if (pwin == 0) mess = 'Player with "O" win';
		if (pwin === -1) mess = 'Hòa';
		alert(mess)
		endGame()
	}
	// Khi click set lại time
	// else {
	// 	pgr.value = pgr.getAttribute("max")
	// 	timeRun = timeDefault
	// }
}

// Min 2 số
function minab(a, b) {
	if (a < b) return a;
	else return b;
}

// Time
function LoadProgress() {
	let pgr = document.querySelector(".control__time");
	if (!timereturn || !InGame) return 1;
	setTimeout(
		function () {
			pgr.value--;
			timeRun -= 100
			timeTxt.innerText = seekTime(timeRun);
			if (pgr.value > 0)
				LoadProgress();
			else {
				let mess = 'Player with "X" win';
				if (CPlayer == 1) mess = 'Player with "O" win';
				alert(mess);
				endGame()
			}
		}, 100);
}

// Change timereturn
function TimeReturn() {
	let chb = document.querySelector(".begin__chbtime")
	if (chb.checked) timereturn = true;
	else timereturn = false;
}

// Change CPlayer
function PlayerReturn() {
	let player = document.getElementById("X");
	if (player.checked) CPlayer = 1;
	else CPlayer = 0;
}
// tạo chuỗi hiển thị thời gian
function seekTime(time) {
	const min = Math.floor(time / 60000);
	const sec = Math.round((Math.floor(time) - min * 60000) / 1000);
	const mins = min < 10 ? `0${min}` : min;
	const secs = sec < 10 ? `0${sec}` : sec;
	return [`${mins}:${secs}`];
}


function GetBoard() {
	let TBoard = [];
	let sqr = document.getElementsByClassName("square");
	for (i = 0; i < size * size; i++)
		TBoard.push(parseInt(sqr.item(i).getAttribute("player")));

	return TBoard;
}

function WinGame() {
	let result = false;
	let Board = GetBoard();
	for (x = 0; x < size; x++) {
		for (y = 0; y < size; y++) {
			if (winHor(x, y, Board) || winVer(x, y, Board) || winCross1(x, y, Board)
				|| winCross2(x, y, Board)) {
				let square = document.getElementsByClassName("square");
				for (i = 0; i < l_win.length; i++) {
					square.item(l_win[i]).style.backgroundColor = "#ffff00";
				}
				result = true;
			}
			else if (Board.every(value => value !== -1)) {
				result = true;
				pwin = -1
			}
		}
	}
	return result;
}

// Win Dir
// Win ngang
function winHor(x, y, Board) {
	l_win = [];
	let count = 0, counto = 0;// count component
	let player = Board[x + y * size];
	if (player == -1) return false;

	if (x > 0) {
		let p = Board[x - 1 + y * size];
		if (p != player && p != -1) counto++;
	}

	for (i = x; i < size; i++) {
		let p = Board[i + y * size];
		if (p == player && p != -1) {
			count++;
			l_win.push(i + y * size);
		}
		else { if (p != -1) counto++; break; };
	}
	if (count >= countmax) {
		return true;
	}
	return false;
}
//Win dọc
function winVer(x, y, Board) {
	l_win = [];
	let count = 0, counto = 0;
	let player = Board[x + y * size];
	if (player == -1) return false;

	if (y > 0) {
		let p = Board[x + (y - 1) * size];
		if (p != player && p != -1) counto++;
	}

	for (i = y; i < size; i++) {
		let p = Board[x + i * size];
		if (p == player && p != -1) {
			count++;
			l_win.push(x + i * size);
		}
		else { if (p != -1) counto++; break; };
	}
	if (count >= countmax) {
		return true;
	}
	return false;
}
// Win chéo 
function winCross1(x, y, Board) {
	l_win = [];
	if (x > size - countmax || y < countmax - 1) return false;
	let count = 0, counto = 0;
	let player = Board[x + y * size];
	if (player == -1) return false;

	if (y < size - 1 && x > 0) {
		let p = Board[x - 1 + (y + 1) * size];
		if (p != player && p != -1) counto++;
	}

	for (i = 0; i <= minab(size - x, y); i++) {
		let p = Board[(x + i) + (y - i) * size];
		if (p == player && p != -1) {
			count++;
			l_win.push((x + i) + (y - i) * size);
		}
		else { if (p != -1) counto++; break; };
	}
	if (count >= countmax) {
		return true;
	}
	return false;
}
// Win chéo
function winCross2(x, y, Board) {
	l_win = [];
	if (x > size - countmax || y > size - countmax) return false;
	let count = 0, counto = 0;
	let player = Board[x + y * size];
	if (player == -1) return false;

	if (y > 0 && x > 0) {
		let p = Board[x - 1 + (y - 1) * size];
		if (p != player && p != -1) counto++;
	}

	for (i = 0; i < minab(size - x, size - y); i++) {
		let p = Board[(x + i) + (y + i) * size];
		if (p == player && p != -1) {
			count++;
			l_win.push((x + i) + (y + i) * size);
		}
		else { if (p != -1) counto++; break; };
	}
	if (count >= countmax) {
		return true;
	}
	return false;
}

