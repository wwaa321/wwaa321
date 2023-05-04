# 回溯算法的案例：N皇后问题

# 定义一个函数，用于判断当前皇后的位置是否合法
def is_valid(board, row, col):
    # 检查列是否有冲突
    for i in range(row):
        if board[i] == col:
            return False
    # 检查左上方是否有冲突
    for i, j in zip(range(row-1, -1, -1), range(col-1, -1, -1)):
        if board[i] == j:
            return False
    # 检查右上方是否有冲突
    for i, j in zip(range(row-1, -1, -1), range(col+1, len(board))):
        if board[i] == j:
            return False
    return True

# 定义一个函数，用于回溯求解N皇后问题
def backtrack(board, row, res):
    # 如果已经放置了N个皇后，将当前解加入结果列表
    if row == len(board):
        res.append(board[:])
        return
    # 尝试在当前行的每一列放置皇后
    for col in range(len(board)):
        # 如果当前位置合法，继续递归下一行
        if is_valid(board, row, col):
            board[row] = col
            backtrack(board, row+1, res)
            board[row] = -1

# 定义一个函数，用于求解N皇后问题
def solve_n_queens(n):
    # 初始化棋盘
    board = [-1] * n
    # 初始化结果列表
    res = []
    # 回溯求解N皇后问题
    backtrack(board, 0, res)
    return res

# 测试
print(solve_n_queens(4)) # [[1, 3, 0, 2], [2, 0, 3, 1]]