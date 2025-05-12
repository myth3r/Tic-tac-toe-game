// Импортируем зависимости и анимации
import Lottie from 'lottie-react';
import crossAnimation from '../assets/cross.json';
import ovalAnimation from '../assets/oval.json';

// Интерфейс для пропсов ячейки
interface CellProps {
    value: 'X' | 'O' | null; // Значение ячейки
    onClick: () => void;     // Функция обработки клика
}

// Компонент ячейки
const Cell: React.FC<CellProps> = ({ value, onClick }) => {
    return (
        // Контейнер для ячейки с заданными размерами
        <div onClick={onClick} style={{ width: '100px', height: '100px', cursor: 'pointer' }}>
            {/* Отображаем анимацию в зависимости от значения */}
            {value === 'X' && <Lottie
                animationData={crossAnimation}
                loop={false}
                style={{
                    display: "table-cell",
                    position: 'relative',
                    top: 25,
                    left: 25,
                    width: '75%',
                    height: '75%',
                }}
            />}

            {value === 'O' && <Lottie
                animationData={ovalAnimation}
                loop={false}
                style={{
                    display: "table-cell",
                    position: 'relative',
                    top: 25,
                    left: 25,
                    width: '75%',
                    height: '75%',
            }}
            />}
        </div>
    );
};

export default Cell;