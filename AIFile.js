// Min a và b
function minab(a, b) {
	if (a < b) return a;
	else return b;
}
// let A_Atk = [0,2,4,20,100,105,110,115,120,130];
let A_Atk = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];
// let A_Def = [0,1,3,15,55,56,57,58,60,62];
let A_Def = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18];

function AIMode(CPlayer, mode) {
	if (!InGame) return;
	let vmax = -Infinity;
	let px = py = -1;
	if(mode !== undefined){
		vmax = 0
		px = py = Math.floor(size/2)
	}
	let TBoard = GetBoard();
	for (y = 0; y < size; y++) {
		for (x = 0; x < size; x++) {
			if (TBoard[x + y * size] == -1) {
				TBoard[x + y * size] = 0;
				let mark = GetMark(x, y, TBoard);
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

function GetMark(x, y, Tboard) {
	let val = Tboard[x + y * size];
	if (val == -1) return 0;

	let result = A_Atk[GetMarkHor(x, y, Tboard, 1)] + A_Atk[GetMarkVer(x, y, Tboard, 1)]
		+ A_Atk[GetMarkCross1(x, y, Tboard, 1)] + A_Atk[GetMarkCross2(x, y, Tboard, 1)];

	result += A_Def[GetMarkHor(x, y, Tboard, 0)] + A_Def[GetMarkVer(x, y, Tboard, 0)]
		+ A_Def[GetMarkCross1(x, y, Tboard, 0)] + A_Def[GetMarkCross2(x, y, Tboard, 0)];

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