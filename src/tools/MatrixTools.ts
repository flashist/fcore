export class MatrixTools {
    static transpose2dMatrix(matrix: any[][]): any[][] {
        return matrix[0].map((column, index) => matrix.map(row => row[index]));
    }
}