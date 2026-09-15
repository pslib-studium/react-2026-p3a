import React from "react";

type TriangleProps = {
    a: number;
    b: number;
    c: number;
    fillColor: React.SVGProps<SVGPolygonElement>["fill"];
}

const TriangleFromSides: React.FC<TriangleProps> = ({ a = 0, b = 0, c = 0, fillColor = "#808080" }) => {
    // Function to check if the triangle is constructible
    const isConstructible = (a: number, b: number, c: number) => {
        return a + b > c && a + c > b && b + c > a;
    };

    if (!isConstructible(a, b, c)) {
        // Coordinates for an isosceles triangle
        const defaultTriangle = {
            A: { x: 95, y: 95 },
            B: { x: 5, y: 95 },
            C: { x: 50, y: 5 }
        };

        return (
            <svg
                style={{ width: "100%", height: "100%" }}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox={`${0} ${0} ${100} ${100}`}>
                <polygon points={`${defaultTriangle.A.x},${defaultTriangle.A.y} ${defaultTriangle.B.x},${defaultTriangle.B.y} ${defaultTriangle.C.x},${defaultTriangle.C.y}`} fill="red" />
                <text x="50" y="50" transform="translate(-15, 20)" fill="black">TNC</text>
            </svg>
        );
    }

    // Calculate coordinates based on side lengths
    const A = { x: 0, y: 0 };
    const B = { x: a, y: 0 };
    const C = {
        x: (a * a + c * c - b * b) / (2 * a),
        y: Math.sqrt(c * c - ((a * a + c * c - b * b) / (2 * a)) ** 2)
    };

    // Determine the viewBox dimensions
    const minX = Math.min(A.x, B.x, C.x);
    const minY = Math.min(A.y, B.y, C.y);
    const maxX = Math.max(A.x, B.x, C.x);
    const maxY = Math.max(A.y, B.y, C.y);

    // Calculate text size based on triangle dimensions
    const textSize = .25 + Math.min(maxX - minX, maxY - minY) / 6;

    // Calculate midpoints of the sides
    const midAB = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
    const midBC = { x: (B.x + C.x) / 2, y: (B.y + C.y) / 2 };
    const midCA = { x: (C.x + A.x) / 2, y: (C.y + A.y) / 2 };

    return (
        <svg
            style={{ width: "100%", height: "100%" }}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox={`${minX} ${minY} ${maxX-minX} ${maxY-minY}`}>
            <g transform={`translate(0, ${maxY}) scale(1, -1)`}>
                <polygon points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`} fill={fillColor}  />
                <text x={midAB.x} y={midAB.y - textSize / 2} fill="black" fontSize={textSize} transform={`translate(0, ${-textSize/2}) scale(1, -1)`}>a</text>
                <text x={midBC.x} y={midBC.y - textSize / 2} fill="black" fontSize={textSize} transform={`translate(${-textSize/2}, ${maxY - textSize}) scale(1, -1)`}>b</text>
                <text x={midCA.x} y={midCA.y - textSize / 2} fill="black" fontSize={textSize} transform={`translate(${0}, ${maxY - textSize}) scale(1, -1)`}>c</text>
            </g>
        </svg>
    );
};

export default TriangleFromSides;