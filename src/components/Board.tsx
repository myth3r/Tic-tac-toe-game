// Импортируем необходимые зависимости
import { useState } from 'react';
import Lottie from 'lottie-react';
import gridAnimation from "../assets/grid.json";
import Cell from './Cell.tsx';
import * as React from "react";

// Основной компонент игровой доски
const Board: React.FC = () => {
    // Состояние доски: массив из 9 элементов (null - пусто, 'X' - крестик, 'O' - нолик)
    const [board, setBoard] = useState<Array<'X' | 'O' | null>>(Array(9).fill(null));
    // Состояние победителя: null - игра продолжается, 'X' - игрок выиграл, 'O' - компьютер выиграл, 'draw' - ничья
    const [winner, setWinner] = useState<'X' | 'O' | 'draw' | null>(null);

    // Функция проверки победителя
    const checkWinner = (board: Array<'X' | 'O' | null>): 'X' | 'O' | null => {
        // Возможные выигрышные комбинации
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
            [0, 4, 8], [2, 4, 6],            // диагонали
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // Возвращаем 'X' или 'O', если есть победитель
            }
        }
        return null; // Нет победителя
    };

    // Функция хода компьютера: выбирает случайную пустую ячейку
    const computerMove = (board: Array<'X' | 'O' | null>): number => {
        const emptyCells = board
            .map((cell, index) => (cell === null ? index : null))
            .filter((val) => val !== null) as number[];
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        return emptyCells[randomIndex];
    };

    // Обработка клика по ячейке
    const handleClick = (index: number) => {
        // Если ячейка занята или игра окончена, ничего не делаем
        if (board[index] || winner) {
            return;
        }

        // Ход игрока: ставим 'X'
        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);

        // Проверяем, выиграл ли игрок
        const playerWinner = checkWinner(newBoard);
        if (playerWinner) {
            setWinner('X');
            return;
        }

        // Проверяем, есть ли ничья
        if (!newBoard.includes(null)) {
            setWinner('draw');
            return;
        }

        // Ход компьютера: ставим 'O'
        const computerIndex = computerMove(newBoard);
        newBoard[computerIndex] = 'O';
        setBoard(newBoard);

        // Проверяем, выиграл ли компьютер
        const computerWinner = checkWinner(newBoard);
        if (computerWinner) {
            setWinner('O');
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setWinner(null);
    }

    // Рендеринг компонента
    return (
        <div style={{
            display: 'flex',
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }}>
            {/* Контейнер для сетки и ячеек */}
            <div style={{
                position: 'relative',
                width: '300px',
                height: '300px',
                margin: 'auto',
            }}>
            {/* Отображаем анимацию сетки */}
            <Lottie
                animationData={gridAnimation}
                loop={false}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
            }}
            />
            {/* Отображаем ячейки в виде сетки 3x3 */}
            <div
                style={{
                    position: 'absolute',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    width: '300px',
                    margin: 'auto'
            }}
            >
                {board.map((cell, index) => (
                    <Cell key={index} value={cell} onClick={() => handleClick(index)} />
                ))}
            </div>
            {/* Отображаем результат игры */}
            {winner && (
                <div style={{ position: 'relative', marginBottom: '10px' }}>
                    {winner === 'X' && <h1>Вы выиграли!</h1>}
                    {winner === 'O' && <h1>Компьютер выиграл!</h1>}
                    {winner === 'draw' && <h1>Ничья!</h1>}
                    {/* Кнопка для перезапуска игры */}
                    <button
                        onClick={resetGame}
                        style={{
                            textAlign: 'center',
                            marginTop: '10px',
                            padding: '10px 20px'
                    }}
                    >
                        Начать заново
                    </button>
                </div>
            )}
            </div>
        </div>
    );
};

export default Board;