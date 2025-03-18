import React from 'react';

const Thermometer = ({ steps, value, height = 200, orientation = 'vertical' }) => {
    const thermometerWidth = 23;

    const maxValue = Math.max(...steps);
    const clampedValue = Math.min(value, maxValue);

    const fillHeight = (clampedValue / maxValue) * height;

    const isHorizontal = orientation === 'horizontal';

    const createRoundedRectPath = (x, y, width, height, radius, roundedCorners) => {
        let path = `M ${x + radius},${y}`;
        path += `H ${x + width - radius}`;
        if (roundedCorners.includes('top-right')) {
            path += `a ${radius},${radius} 0 0 1 ${radius},${radius}`;
        } else {
            path += `H ${x + width}`;
            path += `V ${y + radius}`;
        }
        path += `V ${y + height - radius}`;
        if (roundedCorners.includes('bottom-right')) {
            path += `a ${radius},${radius} 0 0 1 -${radius},${radius}`;
        } else {
            path += `V ${y + height}`;
            path += `H ${x + radius}`;
        }
        path += `H ${x + radius}`;
        if (roundedCorners.includes('bottom-left')) {
            path += `a ${radius},${radius} 0 0 1 -${radius},-${radius}`;
        } else {
            path += `H ${x}`;
            path += `V ${y + height - radius}`;
        }
        path += `V ${y + radius}`;
        if (roundedCorners.includes('top-left')) {
            path += `a ${radius},${radius} 0 0 1 ${radius},-${radius}`;
        } else {
            path += `V ${y}`;
            path += `H ${x + radius}`;
        }
        path += 'Z';
        return path;
    };

    const isFull = clampedValue >= maxValue;

    return (
        <div style={{ textAlign: 'center' }}>
            <svg
                width={isHorizontal ? height + 40 : 45}
                height={isHorizontal ? 45 : height + 40}
                viewBox={`0 0 ${isHorizontal ? height + 40 : 45} ${isHorizontal ? 45 : height + 40}`}
            >

                <rect
                    x={isHorizontal ? 20 : 20}
                    y={isHorizontal ? 0 : 20}
                    width={isHorizontal ? height : thermometerWidth}
                    height={isHorizontal ? thermometerWidth : height}
                    fill="#e0e0e0"
                    stroke="#000"
                    strokeWidth="1"
                    rx="10"
                />

                {value &&
                    <path
                        d={createRoundedRectPath(
                            isHorizontal ? 20 : 20,
                            isHorizontal ? 0 : 20 + height - fillHeight,
                            isHorizontal ? fillHeight : thermometerWidth,
                            isHorizontal ? thermometerWidth : fillHeight,
                            10,
                            isHorizontal
                                ? ['top-left', 'bottom-left']
                                : isFull
                                    ? ['bottom-left', 'bottom-right', 'top-left', 'top-right']
                                    : ['bottom-left', 'bottom-right']
                        )}
                        fill="#4F81BD"
                    />
                }

                {steps.map((step, index) => {
                    if (index === 0 || index === steps.length - 1)
                        return null;

                    const stepPosition = (step / maxValue) * height;

                    return (
                        <g key={index}>
                            <line
                                x1={isHorizontal ? 20 + stepPosition : 20}
                                y1={isHorizontal ? 15 : 20 + height - stepPosition}
                                x2={isHorizontal ? 20 + stepPosition : 30}
                                y2={isHorizontal ? 23 : 20 + height - stepPosition}
                                stroke="#000"
                                strokeWidth="1"
                            />
                            <text
                                x={isHorizontal ? 20 + stepPosition : 17.5}
                                y={isHorizontal ? 40 : 20 + height - stepPosition + 5}
                                textAnchor={isHorizontal ? "middle" : "end"}
                                fill="#000"
                                fontSize="12"
                            >
                                {step}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

export default Thermometer;
