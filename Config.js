const size = 15 /* Kích thước bàn cờ */
let InGame = false /*Trạng thái play */
let l_played = [],
	l_win = []
let CPlayer = 1 /* Người chơi 1= X 0 = O */
let AI = false /* Sử dụng AI máy */
const countmax = 5 /* Số lượng quân thẳng hàng sẽ thắng */
let timereturn = false; /* Play với thời gian hay không */
let timeDefault = 5 * 60 * 1000 /*time = ms*/
let timeRun = timeDefault
let pwin = -1 /* Người chơi win 0: O và 1: X và -1: Hòa*/
let botDelay = 500 /* Độ trễ của bot khi đánh 500ms */
let isClicks = false;