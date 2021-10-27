// Min a và b
function minab(a, b) {
	if (a < b) return a;
	else return b;
}

// Mảng điểm tấn công
let A_Atk = [0,2,4,20,100,105,110,115,120,130];
// Điểm phòng thủ
let A_Def = [0,1,3,15,55,56,57,58,60,62];

function AIMode(CPlayer, mode) {
	if (!InGame) return;
	let vmax = -Infinity;
	let px = py = -1;
	if(mode !== undefined){
		vmax = 0
		px = py = Math.floor(Math.random() * size)
	}
	let TBoard = GetBoard();
	for (y = 0; y < size; y++) {
		for (x = 0; x < size; x++) {
			if (TBoard[x + y * size] == -1) {
				TBoard[x + y * size] = CPlayer;
				let mark = GetMark(x, y, TBoard, CPlayer);
				TBoard[x + y * size] = -1;
				if (mark > vmax) {
					px = x; py = y;
					vmax = mark;
				}
			}
		}
	}
	try {
		let sqr = document.getElementsByClassName("square");
		sqr.item(px + py * size).setAttribute("player", CPlayer);
		let urlImg = CPlayer == 1 ? "url('Images/Xpng.png')" : "url('Images/Opng.png')"
		sqr.item(px + py * size).style.backgroundImage = urlImg;
		l_played.push(px + py * size);
	}
	catch (e) { alert(e.message) }
}

function GetMark(x, y, Tboard, AI_player) {
	let val = Tboard[x + y * size];
	if (val == -1) return 0;
	let P_player = AI_player === 1 ? 0 : 1

	let result = A_Atk[GetMarkHor(x, y, Tboard, AI_player)] + A_Atk[GetMarkVer(x, y, Tboard, AI_player)]
		+ A_Atk[GetMarkCross1(x, y, Tboard, AI_player)] + A_Atk[GetMarkCross2(x, y, Tboard, AI_player)];

	result += A_Def[GetMarkHor(x, y, Tboard, P_player)] + A_Def[GetMarkVer(x, y, Tboard, P_player)]
		+ A_Def[GetMarkCross1(x, y, Tboard, P_player)] + A_Def[GetMarkCross2(x, y, Tboard, P_player)];

	return result;
}

function GetMarkHor(x, y, TBoard, player) {
	let count = 0, counto = 0;
	for (i = x - 1; i > 0; i--) {
		if (TBoard[i + y * size] == player) count++;
		else { if (TBoard[i + y * size] != -1) counto++; break; }
	}
	for (i = x + 1; i < size; i++) {
		if (TBoard[i + y * size] == player) count++;
		else { if (TBoard[i + y * size] != -1) counto++; break; }
	}
	if ((x == 0 || x == size - 1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}

function GetMarkVer(x, y, TBoard, player) {
	let count = 0, counto = 0;
	for (i = y - 1; i > 0; i--) {
		if (TBoard[x + i * size] == player) count++;
		else { if (TBoard[x + i * size] != -1) counto++; break; }
	}
	for (i = y + 1; i < size; i++) {
		if (TBoard[x + i * size] == player) count++;
		else { if (TBoard[x + i * size] != -1) counto++; break; }
	}
	if ((y == 0 || y == size - 1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}

function GetMarkCross1(x, y, TBoard, player) {
	let count = 0, counto = 0;
	for (i = 1; i < minab(size - x, y + 1); i++) {
		if (TBoard[(x + i) + (y - i) * size] == player) count++;
		else { if (TBoard[(x + i) + (y - i) * size] != -1) counto++; break; }
	}
	for (i = 1; i < minab(x + 1, size - y); i++) {
		if (TBoard[(x - i) + (y + i) * size] == player) count++;
		else { if (TBoard[(x - i) + (y + i) * size] != -1) counto++; break; }
	}
	if ((x == 0 || x == size - 1 || y == 0 || y == size - 1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}

function GetMarkCross2(x, y, TBoard, player) {
	let count = 0, counto = 0;
	for (i = 1; i < minab(x + 1, y + 1); i++) {
		if (TBoard[(x - i) + (y - i) * size] == player) count++;
		else { if (TBoard[(x - i) + (y - i) * size] != -1) counto++; break; }
	}
	for (i = 1; i < minab(size - x, size - y); i++) {
		if (TBoard[(x + i) + (y + i) * size] == player) count++;
		else { if (TBoard[(x + i) + (y + i) * size] != -1) counto++; break; }
	}
	if ((x == 0 || x == size - 1 || y == 0 || y == size - 1) && count < 4) counto++;
	if (count <= counto) return 0;
	else if (count - counto >= 3) return count + counto;
	else return count - counto;
}