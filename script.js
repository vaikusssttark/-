/**
 * Created by Никита on 08.12.2017.
 */
function playGame() {

//переменные
    var rectWidth = 45;
    var rectHeight = 30;
    var snakeColor = "#006699";
    var canvas;
    var directions = [];
    var x_dir = [-1, 0, 1, 0];
    var y_dir = [0, -1, 0, 1];
    var queue = [];
    var food = 1;
    var map = [];
    var random = Math.random;
    var X = 5 + (random() * (rectWidth - 10)) | 0;
    var Y = 5 + (random() * (rectHeight - 10)) | 0;
    var direction = random() * 3 | 0;
    var interval = 0;
    var score = 0;
    var dir;

//достаем canvas
    var c = document.getElementById('playArea');
    canvas = c.getContext('2d');

//формируем поле
    for (var i = 0; i < rectWidth; i++) {
        map[i] = [];
    }

//размещаем еду в случайном месте
    function randomFood() {
        var x = random() * rectWidth | 0;
        var y = random() * rectHeight | 0;
        if (map[x][y] !== 2) {
            map[x][y] = 1;
            canvas.fillStyle = snakeColor;
            canvas.strokeRect(x * 10 + 1, y * 10 + 1, 8, 8);
        }
    }

    randomFood();

//отрисовка игры
    function drawGame() {
        //узнаем направление змейки
        if (directions.length !== 0) {
            dir = directions.pop();
            if ((dir % 2) !== (direction % 2))
                direction = dir;
        }

        //проверяем не врезались ли в края или в сами в себя
        if ((X >= 0 && Y >= 0 && X < rectWidth && Y < rectHeight) && map[X][Y] !== 2) {
            if (map[X][Y] === 1) {
                score += 1;
                randomFood();
                food++;
            }
            canvas.fillRect(X * 10, Y * 10, 10, 10);
            map[X][Y] = 2;
            queue.unshift([X, Y]);
            X += x_dir[direction];
            Y += y_dir[direction];
            if (food < queue.length) {
                dir = queue.pop();
                map[dir[0]][dir[1]] = 0;
                canvas.clearRect(dir[0] * 10, dir[1] * 10, 10, 10);
            }
        } else if (!directions.length) {
            var msgScore = document.getElementById('msg');
            msgScore.innerHTML = "Ваш результат : <b>" + score + "</b><br /><br /><input type='button' value='Играть заново' onclick='window.location.reload();' />";
            document.getElementById("playArea").style.display = 'none';
            window.clearInterval(interval);
        }
    }

    interval = window.setInterval(drawGame, 160);
    document.onkeydown = function (key) {
        var code = key.keyCode - 37;
        if (0 <= code && code < 4 && code !== directions[0])
            directions.unshift(code);

    }
}