# -*- coding: utf-8 -*-
import math
import time
import random


class BitBFS_2113:
    INF = 100000000
    SX = 9
    SY = 9

    _BOARD_MASK = (1 << 81) - 1


    _RIGHT_EDGE = sum(1 << (x + y * 9) for y in range(9) for x in [8])
    _LEFT_EDGE  = sum(1 << (x + y * 9) for y in range(9) for x in [0])
    _TOP_EDGE   = sum(1 << (x + y * 9) for y in [8] for x in range(9))
    _BOT_EDGE   = sum(1 << (x + y * 9) for y in [0] for x in range(9))

    def __init__(self, finish_line_y):
        self.finish_line_y = finish_line_y
        self._goal_frontier = 0
        for x in range(9):
            self._goal_frontier |= 1 << (x + finish_line_y * 9)
        self.dist_map = [self.INF] * 81

    def compute(self, blocked_up, blocked_down, blocked_right, blocked_left, player_positions):
        BOARD = self._BOARD_MASK

        frontier = self._goal_frontier
        visited = frontier

        self.dist_map = [self.INF] * 81
        fy = self.finish_line_y
        for x in range(9):
            self.dist_map[x + fy * 9] = 0

        d = 1
        while frontier:
            can_up = frontier & ~self._TOP_EDGE & ~blocked_up
            can_down = frontier & ~self._BOT_EDGE & ~blocked_down
            can_right = frontier & ~self._RIGHT_EDGE & ~blocked_right
            can_left = frontier & ~self._LEFT_EDGE & ~blocked_left

            new_frontier = ((can_up << 9) | (can_down >> 9) | ((can_right << 1) & BOARD) | (can_left >> 1)) & ~visited & BOARD

            if not new_frontier:
                break

            visited |= new_frontier
            frontier = new_frontier

            tmp = new_frontier
            while tmp:
                bit = tmp & (-tmp)
                self.dist_map[bit.bit_length() - 1] = d
                tmp ^= bit
            d += 1

        for px, py in player_positions:
            if self.dist_map[px + py * 9] == self.INF:
                return False
        return True

    def check_single(self, bu, bd, br, bl, px, py):
        BOARD = self._BOARD_MASK
        fy = self.finish_line_y
        if py == fy:
            return True, 0

        frontier = 1 << (px + py * 9)
        visited = frontier
        d = 1
        goal_frontier = self._goal_frontier

        while frontier:
            can_up = frontier & ~self._TOP_EDGE & ~bu
            can_down = frontier & ~self._BOT_EDGE & ~bd
            can_right = frontier & ~self._RIGHT_EDGE & ~br
            can_left = frontier & ~self._LEFT_EDGE & ~bl

            new_frontier = ((can_up << 9) | (can_down >> 9) | ((can_right << 1) & BOARD) | (can_left >> 1)) & ~visited & BOARD
            if not new_frontier:
                break

            if new_frontier & goal_frontier:
                return True, d

            visited |= new_frontier
            frontier = new_frontier
            d += 1
        return False, self.INF

    def get_distance(self, pos_x, pos_y):
        return self.dist_map[pos_x + pos_y * 9]

    @staticmethod
    def walls_to_blocked(walls):
        bu = bd = br = bl = 0
        for wx, wy, d in walls:
            if d == 0:
                for cx in [wx, wx + 1]:
                    bu |= 1 << (cx + wy * 9)
                    bd |= 1 << (cx + (wy + 1) * 9)
            else:
                for cy in [wy, wy - 1]:
                    br |= 1 << (wx + cy * 9)
                    bl |= 1 << ((wx + 1) + cy * 9)
        return bu, bd, br, bl


class QuoridorSim_2113:
    DIRECTIONS = [(0, 1), (1, 0), (0, -1), (-1, 0)]

    _PIVOT_OFFSETS = [(0, 0), (0, -1), (-1, -1), (-1, 0)]

    def __init__(self, size_x=9, size_y=9, max_walls=10, num_player=2, init_pos=None):
        if init_pos is None:
            init_pos = [(4, 0), (4, 8)]
        self.size_x = size_x
        self.size_y = size_y
        self.max_walls = max_walls
        self.num_player = num_player

        self.map = [[0 for _ in range(size_y)] for _ in range(size_x)]
        self.player_pos = list(init_pos)
        self.move_history = [[] for _ in range(num_player)]
        self.finish_line = []
        self.wall_count = [0 for _ in range(num_player)]
        self.turn = 0

        self.pivot_mask = 0
        self.wall_list = []

        for i in range(self.num_player):
            if init_pos[i][1] == 0:
                f = 8
            elif init_pos[i][1] == 8:
                f = 0
            else:
                raise ValueError(f"invalid init_pos ({init_pos[i][0]}, {init_pos[i][1]})")
            self.move_history[i].append(init_pos[i])
            self.finish_line.append(f)
            self.write_map(init_pos[i][0], init_pos[i][1], 0, 1)

        self.bfs = [
            BitBFS_2113(self.finish_line[i]) for i in range(self.num_player)
        ]

        bu, bd, br, bl = BitBFS_2113.walls_to_blocked(self.wall_list)
        for p in range(self.num_player):
            self.bfs[p].compute(bu, bd, br, bl, self.player_pos)

    @staticmethod
    def _wall_pivot(pos_x, pos_y, direction):
        ox, oy = QuoridorSim_2113._PIVOT_OFFSETS[direction]
        return (pos_y + oy) * 8 + (pos_x + ox)

    def move_player(self, player, direction, diag=None):
        if player != self.turn:
            return False

        pos_x, pos_y = self.player_pos[player][0], self.player_pos[player][1]
        dx, dy = self.DIRECTIONS[direction]
        dist = 1
        target_x, target_y = pos_x, pos_y

        if diag is None:
            if not self.check_map_range(pos_x + dx, pos_y + dy):
                return False
            if not self.verify_move(pos_x, pos_y, direction):
                return False
            if self.check_player(pos_x + dx, pos_y + dy):
                if not self.verify_move(pos_x + dx, pos_y + dy, direction):
                    return False
                if not self.check_map_range(pos_x + dx * 2, pos_y + dy * 2):
                    return False
                if self.check_player(pos_x + dx * 2, pos_y + dy * 2):
                    return False
                dist = 2

            target_x, target_y = pos_x + dx * dist, pos_y + dy * dist
            self.player_pos[player] = target_x, target_y
        else:
            if diag != 1 and diag != -1:
                raise ValueError(f"invalid diag {diag}")
            if not self.check_map_range(pos_x + dx, pos_y + dy):
                return False
            if not self.check_player(pos_x + dx, pos_y + dy):
                return False
            if not self.verify_move(pos_x, pos_y, direction):
                return False
            if not self.check_map_range(pos_x + dx * 2, pos_y + dy * 2) or self.read_map(pos_x + dx, pos_y + dy, direction + 1):
                target_x, target_y = pos_x + dx, pos_y + dy
                if direction == 0: target_x += diag
                elif direction == 1: target_y -= diag
                elif direction == 2: target_x -= diag
                elif direction == 3: target_y += diag

                if not self.check_map_range(target_x, target_y):
                    return False

                lateral_dir = (direction + 1) % 4 if diag == 1 else (direction + 3) % 4
                if not self.verify_move(pos_x + dx, pos_y + dy, lateral_dir):
                    return False

                if self.check_player(target_x, target_y):
                    return False

                self.player_pos[player] = target_x, target_y
            else:
                return False

        self.write_map(pos_x, pos_y, 0, 0)
        self.write_map(target_x, target_y, 0, 1)

        self.move_history[player].append((target_x, target_y))
        self.turn = (self.turn + 1) % self.num_player
        return True

    def check_move_player(self, player, direction, diag=None):
        if player != self.turn:
            return False

        pos_x, pos_y = self.player_pos[player][0], self.player_pos[player][1]
        dx, dy = self.DIRECTIONS[direction]
        dist = 1
        target_x, target_y = pos_x, pos_y

        if diag is None:
            if not self.check_map_range(pos_x + dx, pos_y + dy):
                return False
            if not self.verify_move(pos_x, pos_y, direction):
                return False
            if self.check_player(pos_x + dx, pos_y + dy):
                if not self.verify_move(pos_x + dx, pos_y + dy, direction):
                    return False
                if not self.check_map_range(pos_x + dx * 2, pos_y + dy * 2):
                    return False
                if self.check_player(pos_x + dx * 2, pos_y + dy * 2):
                    return False
                dist = 2
            target_x, target_y = pos_x + dx * dist, pos_y + dy * dist
        else:
            if diag != 1 and diag != -1:
                raise ValueError(f"invalid diag {diag}")
            if not self.check_map_range(pos_x + dx, pos_y + dy):
                return False
            if not self.check_player(pos_x + dx, pos_y + dy):
                return False
            if not self.verify_move(pos_x, pos_y, direction):
                return False
            if not self.check_map_range(pos_x + dx * 2, pos_y + dy * 2) or self.read_map(pos_x + dx, pos_y + dy, direction + 1):
                target_x, target_y = pos_x + dx, pos_y + dy
                if direction == 0: target_x += diag
                elif direction == 1: target_y -= diag
                elif direction == 2: target_x -= diag
                elif direction == 3: target_y += diag

                if not self.check_map_range(target_x, target_y):
                    return False

                lateral_dir = (direction + 1) % 4 if diag == 1 else (direction + 3) % 4
                if not self.verify_move(pos_x + dx, pos_y + dy, lateral_dir):
                    return False

                if self.check_player(target_x, target_y):
                    return False
            else:
                return False
        return True

    def set_wall(self, player, pos_x, pos_y, direction):
        if player != self.turn:
            return (False, None)
        if self.wall_count[player] >= self.max_walls:
            return (False, None)

        pdx, pdy = self.DIRECTIONS[(direction + 1) % 4]
        kx, ky = pos_x + pdx, pos_y + pdy
        dx, dy = self.DIRECTIONS[direction]

        if not self.check_map_range(pos_x, pos_y) or not self.check_map_range(kx, ky):
            return (False, None)
        if not self.check_map_range(pos_x + dx, pos_y + dy):
            return (False, None)

        if self.read_map(pos_x, pos_y, direction + 1):
            return (False, None)
        if self.read_map(kx, ky, direction + 1):
            return (False, None)

        pivot = self._wall_pivot(pos_x, pos_y, direction)
        if self.pivot_mask & (1 << pivot):
            return (False, None)

        temp_walls = self.wall_list + [(pos_x, pos_y, direction)]
        bu, bd, br, bl = BitBFS_2113.walls_to_blocked(temp_walls)

        is_valid = True
        for p in range(self.num_player):
            px, py = self.player_pos[p]
            ok, _ = self.bfs[p].check_single(bu, bd, br, bl, px, py)
            if not ok:
                is_valid = False
                break

        if not is_valid:
            return (False, None)

        self.set_single_wall(pos_x, pos_y, direction)
        self.set_single_wall(kx, ky, direction)

        self.pivot_mask |= (1 << pivot)
        self.wall_list.append((pos_x, pos_y, direction))
        self.wall_count[player] += 1
        self.turn = (self.turn + 1) % self.num_player

        for p in range(self.num_player):
            self.bfs[p].compute(bu, bd, br, bl, self.player_pos)

        dist = [self.bfs[p].get_distance(self.player_pos[p][0], self.player_pos[p][1]) for p in range(self.num_player)]
        return (True, dist)

    def check_set_wall(self, player, pos_x, pos_y, direction):
        if player != self.turn:
            return (False, None)
        if self.wall_count[player] >= self.max_walls:
            return (False, None)

        pdx, pdy = self.DIRECTIONS[(direction + 1) % 4]
        kx, ky = pos_x + pdx, pos_y + pdy
        dx, dy = self.DIRECTIONS[direction]

        if not self.check_map_range(pos_x, pos_y) or not self.check_map_range(kx, ky):
            return (False, None)
        if not self.check_map_range(pos_x + dx, pos_y + dy):
            return (False, None)

        if self.read_map(pos_x, pos_y, direction + 1):
            return (False, None)
        if self.read_map(kx, ky, direction + 1):
            return (False, None)

        pivot = self._wall_pivot(pos_x, pos_y, direction)
        if self.pivot_mask & (1 << pivot):
            return (False, None)

        temp_walls = self.wall_list + [(pos_x, pos_y, direction)]
        bu, bd, br, bl = BitBFS_2113.walls_to_blocked(temp_walls)

        is_valid = True
        dists = []
        for p in range(self.num_player):
            px, py = self.player_pos[p]
            ok, dp = self.bfs[p].check_single(bu, bd, br, bl, px, py)
            if not ok:
                is_valid = False
                break
            dists.append(dp)

        if not is_valid:
            return (False, None)

        return (True, dists)

    def check_wall_geometry(self, player, pos_x, pos_y, direction):
        if player != self.turn:
            return False
        if self.wall_count[player] >= self.max_walls:
            return False

        pdx, pdy = self.DIRECTIONS[(direction + 1) % 4]
        kx, ky = pos_x + pdx, pos_y + pdy
        dx, dy = self.DIRECTIONS[direction]

        if not self.check_map_range(pos_x, pos_y) or not self.check_map_range(kx, ky):
            return False
        if not self.check_map_range(pos_x + dx, pos_y + dy):
            return False

        if self.read_map(pos_x, pos_y, direction + 1):
            return False
        if self.read_map(kx, ky, direction + 1):
            return False

        pivot = self._wall_pivot(pos_x, pos_y, direction)
        if self.pivot_mask & (1 << pivot):
            return False
        return True

    def set_single_wall(self, pos_x, pos_y, direction):
        if not self.check_map_range(pos_x, pos_y):
            raise IndexError(f"invalid position: ({pos_x}, {pos_y})")

        if self.read_map(pos_x, pos_y, direction + 1):
            return False
        dx, dy = self.DIRECTIONS[direction]
        nx, ny = pos_x + dx, pos_y + dy

        self.write_map(pos_x, pos_y, direction + 1, 1)
        if self.check_map_range(nx, ny):
            self.write_map(nx, ny, (direction + 2) % 4 + 1, 1)
        return True

    def remove_single_wall(self, pos_x, pos_y, direction):
        if not self.check_map_range(pos_x, pos_y):
            raise IndexError(f"invalid position: ({pos_x}, {pos_y})")

        if not self.read_map(pos_x, pos_y, direction + 1):
            return False
        dx, dy = self.DIRECTIONS[direction]
        nx, ny = pos_x + dx, pos_y + dy

        self.write_map(pos_x, pos_y, direction + 1, 0)
        if self.check_map_range(nx, ny):
            self.write_map(nx, ny, (direction + 2) % 4 + 1, 0)
        return True

    def check_player(self, pos_x, pos_y):
        return bool(self.read_map(pos_x, pos_y, 0))

    def verify_move(self, pos_x, pos_y, direction):
        return not bool(self.read_map(pos_x, pos_y, direction + 1))

    def read_map(self, pos_x, pos_y, idx):
        return (self.map[pos_x][pos_y] >> idx) & 1

    def write_map(self, pos_x, pos_y, idx, value):
        if value == 1:
            self.map[pos_x][pos_y] |= (1 << idx)
        else:
            self.map[pos_x][pos_y] &= ~(1 << idx)

    def check_map_range(self, pos_x, pos_y):
        return 0 <= pos_x < self.size_x and 0 <= pos_y < self.size_y

    def force_move_to(self, player, pos_x, pos_y):
        px, py = self.player_pos[player]

        self.write_map(px, py, 0, 0)
        self.player_pos[player] = (pos_x, pos_y)
        self.write_map(pos_x, pos_y, 0, 1)

        self.move_history[player].append((pos_x, pos_y))
        self.turn = (self.turn + 1) % self.num_player
        return True

    def replay_wall(self, player, pos_x, pos_y, direction):
        pdx, pdy = self.DIRECTIONS[(direction + 1) % 4]
        kx, ky = pos_x + pdx, pos_y + pdy
        self.set_single_wall(pos_x, pos_y, direction)
        self.set_single_wall(kx, ky, direction)
        pivot = self._wall_pivot(pos_x, pos_y, direction)
        self.pivot_mask |= (1 << pivot)
        self.wall_list.append((pos_x, pos_y, direction))
        self.wall_count[player] += 1
        self.turn = (self.turn + 1) % self.num_player


class MCTSNodeBitwise_2113:
    def __init__(self, state, action=None, prior=0.5):
        self.state = state
        self.action = action
        self.children = {}
        self.visits = 0
        self.value_sum = 0.0
        self.untried = None
        self.prior = prior

    def value(self):
        if self.visits == 0:
            return 0.0
        return self.value_sum / self.visits

    def puct(self, parent_visits, c_puct=1.414):
        exploration = c_puct * self.prior * math.sqrt(max(parent_visits, 1))
        bias = 0.5 * self.prior / (1 + self.visits)
        if self.visits == 0:
            return exploration + bias
        return self.value() + exploration / (1 + self.visits) + bias

    def is_fully_expanded(self):
        return self.untried is not None and len(self.untried) == 0


class MCTSBitwise_2113:
    C_PUCT = 1.414
    _BOARD = (1 << 81) - 1
    _COL8  = sum(1 << (8 + y * 9) for y in range(9))
    _COL0  = sum(1 << (y * 9) for y in range(9))
    _ROW8  = sum(1 << (72 + x) for x in range(9))
    _ROW0  = sum(1 << x for x in range(9))

    _GOAL_FRONTIER_0 = (1 << 9) - 1
    _GOAL_FRONTIER_8 = ((1 << 9) - 1) << 72

    def __init__(self):
        self.transposition_table = {}

    @staticmethod
    def _blocked(wall_h, wall_v):
        h_blocked = wall_h | ((wall_h << 1) & ~MCTSBitwise_2113._COL0)

        v_blocked = wall_v | (wall_v >> 9)

        block_up = ((h_blocked << 9) & MCTSBitwise_2113._BOARD) | MCTSBitwise_2113._ROW0

        block_down = h_blocked | MCTSBitwise_2113._ROW8

        block_left = ((v_blocked << 1) & ~MCTSBitwise_2113._COL0) | MCTSBitwise_2113._COL0

        block_right = v_blocked | MCTSBitwise_2113._COL8

        return block_up, block_down, block_left, block_right

    @staticmethod
    def _valid_moves(curr_pos, opp_pos, b_up, b_down, b_left, b_right):
        moves = []
        vis = 1 << curr_pos
        opp_vis = 1 << opp_pos

        if not (vis & b_up):
            nxt = curr_pos - 9
            if nxt == opp_pos:
                if not (opp_vis & b_up):
                    moves.append(opp_pos - 9)
                else:
                    if not (opp_vis & b_left): moves.append(opp_pos - 1)
                    if not (opp_vis & b_right): moves.append(opp_pos + 1)
            else:
                moves.append(nxt)

        if not (vis & b_down):
            nxt = curr_pos + 9
            if nxt == opp_pos:
                if not (opp_vis & b_down):
                    moves.append(opp_pos + 9)
                else:
                    if not (opp_vis & b_left): moves.append(opp_pos - 1)
                    if not (opp_vis & b_right): moves.append(opp_pos + 1)
            else:
                moves.append(nxt)

        if not (vis & b_left):
            nxt = curr_pos - 1
            if nxt == opp_pos:
                if not (opp_vis & b_left):
                    moves.append(opp_pos - 1)
                else:
                    if not (opp_vis & b_up): moves.append(opp_pos - 9)
                    if not (opp_vis & b_down): moves.append(opp_pos + 9)
            else:
                moves.append(nxt)

        if not (vis & b_right):
            nxt = curr_pos + 1
            if nxt == opp_pos:
                if not (opp_vis & b_right):
                    moves.append(opp_pos + 1)
                else:
                    if not (opp_vis & b_up): moves.append(opp_pos - 9)
                    if not (opp_vis & b_down): moves.append(opp_pos + 9)
            else:
                moves.append(nxt)

        return moves

    @staticmethod
    def _wall_geom_ok(wall_h, wall_v, pivot_mask, walls_left, wx, wy, d):
        if walls_left <= 0:
            return False
        if d == 0:
            if not (0 <= wx <= 7 and 0 <= wy <= 7):
                return False
            bit = 1 << (wx + wy * 9)
            if wall_h & (((bit >> 1) & ~MCTSBitwise_2113._COL8) | bit | (bit << 1)):
                return False
            pivot = wy * 8 + wx
        else:
            if not (0 <= wx <= 7 and 1 <= wy <= 8):
                return False
            bit = 1 << (wx + wy * 9)
            if wall_v & ((bit >> 9) | bit | (bit << 9)):
                return False
            pivot = (wy - 1) * 8 + wx
        return not (pivot_mask & (1 << pivot))

    @staticmethod
    def _bfs_dist(wall_h, wall_v, goal_y):
        b_up, b_down, b_left, b_right = MCTSBitwise_2113._blocked(wall_h, wall_v)
        goal_frontier = 0
        for x in range(9):
            goal_frontier |= 1 << (x + goal_y * 9)
        frontier = goal_frontier
        visited  = frontier
        dist     = [999] * 81
        for x in range(9):
            dist[x + goal_y * 9] = 0
        step = 1

        while frontier:
            can_up = frontier & ~b_up
            can_down = frontier & ~b_down
            can_left = frontier & ~b_left
            can_right = frontier & ~b_right

            nf = ((can_up >> 9) | ((can_down << 9) & MCTSBitwise_2113._BOARD) | (can_left >> 1) | ((can_right << 1) & MCTSBitwise_2113._BOARD)) & ~visited & MCTSBitwise_2113._BOARD
            if not nf:
                break
            visited |= nf
            tmp = nf
            while tmp:
                b = tmp & (-tmp)
                dist[b.bit_length() - 1] = step
                tmp ^= b
            frontier = nf
            step += 1
        return dist

    @staticmethod
    def _bfs_dist_single(wall_h, wall_v, start_pos, goal_y):
        if start_pos // 9 == goal_y:
            return 0
        b_up, b_down, b_left, b_right = MCTSBitwise_2113._blocked(wall_h, wall_v)
        goal_frontier = MCTSBitwise_2113._GOAL_FRONTIER_8 if goal_y == 8 else MCTSBitwise_2113._GOAL_FRONTIER_0

        frontier = 1 << start_pos
        visited = frontier
        BOARD = MCTSBitwise_2113._BOARD
        step = 1
        while frontier:
            can_up = frontier & ~b_up
            can_down = frontier & ~b_down
            can_left = frontier & ~b_left
            can_right = frontier & ~b_right

            nf = ((can_up >> 9) | (can_down << 9) | (can_left >> 1) | (can_right << 1)) & ~visited & BOARD
            if not nf:
                break
            if nf & goal_frontier:
                return step
            visited |= nf
            frontier = nf
            step += 1
        return 999

    @staticmethod
    def _has_path(pos0, pos1, wall_h, wall_v):
        b_up, b_down, b_left, b_right = MCTSBitwise_2113._blocked(wall_h, wall_v)

        p0_vis = 1 << pos0
        BOARD = MCTSBitwise_2113._BOARD
        while True:
            can_up = p0_vis & ~b_up
            can_down = p0_vis & ~b_down
            can_left = p0_vis & ~b_left
            can_right = p0_vis & ~b_right
            nxt = p0_vis | ((can_up >> 9) | (can_down << 9) | (can_left >> 1) | (can_right << 1)) & BOARD
            if nxt == p0_vis: break
            p0_vis = nxt
            if p0_vis & MCTSBitwise_2113._ROW8: break
        if not (p0_vis & MCTSBitwise_2113._ROW8): return False

        p1_vis = 1 << pos1
        while True:
            can_up = p1_vis & ~b_up
            can_down = p1_vis & ~b_down
            can_left = p1_vis & ~b_left
            can_right = p1_vis & ~b_right
            nxt = p1_vis | ((can_up >> 9) | (can_down << 9) | (can_left >> 1) | (can_right << 1)) & BOARD
            if nxt == p1_vis: break
            p1_vis = nxt
            if p1_vis & MCTSBitwise_2113._ROW0: break
        return bool(p1_vis & MCTSBitwise_2113._ROW0)

    @staticmethod
    def _trace_path(start_pos, dist, goal_y, wall_h, wall_v):
        b_up, b_down, b_left, b_right = MCTSBitwise_2113._blocked(wall_h, wall_v)
        path = []
        cur  = start_pos
        while cur // 9 != goal_y:
            path.append(cur)
            cx, cy = cur % 9, cur // 9
            best, best_d = None, dist[cur]
            vis = 1 << cur
            if cy > 0 and not (vis & b_up) and dist[cur - 9] < best_d:
                best_d = dist[cur - 9]
                best = cur - 9
            if cy < 8 and not (vis & b_down) and dist[cur + 9] < best_d:
                best_d = dist[cur + 9]
                best = cur + 9
            if cx > 0 and not (vis & b_left) and dist[cur - 1] < best_d:
                best_d = dist[cur - 1]
                best = cur - 1
            if cx < 8 and not (vis & b_right) and dist[cur + 1] < best_d:
                best_d = dist[cur + 1]
                best = cur + 1
            if best is None: break
            cur = best
        path.append(cur)
        return path

    @staticmethod
    def _path_attack_walls(path, wall_h, wall_v, pivot_mask, walls_left):
        walls = []
        for i in range(len(path) - 1):
            u, v   = path[i], path[i + 1]
            ux, wy = u % 9, u // 9
            vx, vy = v % 9, v // 9
            if ux == vx:
                min_y = min(wy, vy)
                for wx in [ux - 1, ux]:
                    if MCTSBitwise_2113._wall_geom_ok(wall_h, wall_v, pivot_mask, walls_left, wx, min_y, 0):
                        walls.append((wx, min_y, 0))
            else:
                min_x = min(ux, vx)
                for wy_t in [wy, wy + 1]:
                    if MCTSBitwise_2113._wall_geom_ok(wall_h, wall_v, pivot_mask, walls_left, min_x, wy_t, 1):
                        walls.append((min_x, wy_t, 1))
        return walls

    @staticmethod
    def _get_actions(state):
        pos0, pos1, wcnt0, wcnt1, wall_h, wall_v, turn, pivot_mask = state
        curr_pos   = pos0  if turn == 0 else pos1
        opp_pos    = pos1  if turn == 0 else pos0
        walls_left = wcnt0 if turn == 0 else wcnt1
        goal_y     = 8 if turn == 0 else 0
        opp_goal_y = 0 if turn == 0 else 8

        b_up, b_down, b_left, b_right = MCTSBitwise_2113._blocked(wall_h, wall_v)
        actions = []

        curr_dist = MCTSBitwise_2113._bfs_dist(wall_h, wall_v, goal_y)
        my_d      = curr_dist[curr_pos]

        opp_dist = MCTSBitwise_2113._bfs_dist(wall_h, wall_v, opp_goal_y)
        opp_d    = opp_dist[opp_pos]

        is_desperate = (opp_d <= 4 and my_d > opp_d)

        for dest in MCTSBitwise_2113._valid_moves(curr_pos, opp_pos, b_up, b_down, b_left, b_right):
            prior = 0.7 if curr_dist[dest] < my_d else 0.3
            if is_desperate:
                prior *= 0.1
            actions.append((dest, prior))

        if walls_left > 0:
            opp_path = MCTSBitwise_2113._trace_path(opp_pos, opp_dist, opp_goal_y, wall_h, wall_v)
            candidates = MCTSBitwise_2113._path_attack_walls(opp_path, wall_h, wall_v, pivot_mask, walls_left)

            opp_walls_left = wcnt1 if turn == 0 else wcnt0
            wall_set = set()

            for (wx, wy, d) in candidates:
                idx = wy * 9 + wx
                action_idx = 81 + idx if d == 0 else 162 + idx

                bit = 1 << idx
                if d == 0:
                    n_wh, n_wv = wall_h | bit, wall_v
                else:
                    n_wh, n_wv = wall_h, wall_v | bit

                if MCTSBitwise_2113._has_path(pos0, pos1, n_wh, n_wv):
                    prior_val = 5.0 if is_desperate else 0.6
                    actions.append((action_idx, prior_val))
                    wall_set.add((wx, wy, d))

            if opp_walls_left > 0 and my_d > 0:
                my_path = MCTSBitwise_2113._trace_path(curr_pos, curr_dist, goal_y, wall_h, wall_v)
                for i in range(min(4, len(my_path) - 1)):
                    u, v = my_path[i], my_path[i + 1]
                    ux, uy = u % 9, u // 9
                    vx, vy = v % 9, v // 9
                    if ux == vx:
                        min_y = min(uy, vy)
                        threats = [(ux - 1, min_y, 0), (ux, min_y, 0)]
                    else:
                        min_x = min(ux, vx)
                        threats = [(min_x, uy, 1), (min_x, uy + 1, 1)]
                    for twx, twy, td in threats:
                        if not MCTSBitwise_2113._wall_geom_ok(wall_h, wall_v, pivot_mask, opp_walls_left, twx, twy, td):
                            continue

                        tbit = 1 << (twx + twy * 9)
                        if td == 0:
                            t_wh, t_wv = wall_h | tbit, wall_v
                        else:
                            t_wh, t_wv = wall_h, wall_v | tbit
                        t_my_d = MCTSBitwise_2113._bfs_dist_single(t_wh, t_wv, curr_pos, goal_y)
                        if t_my_d - my_d < 2:
                            continue

                        if td == 0:
                            cwx, cwy, cd = twx, twy + 1, 1
                        else:
                            cwx, cwy, cd = twx, twy - 1, 0
                        if MCTSBitwise_2113._wall_geom_ok(wall_h, wall_v, pivot_mask, walls_left, cwx, cwy, cd):
                            cbit = 1 << (cwx + cwy * 9)
                            if cd == 0:
                                cn_wh, cn_wv = wall_h | cbit, wall_v
                            else:
                                cn_wh, cn_wv = wall_h, wall_v | cbit
                            if MCTSBitwise_2113._has_path(pos0, pos1, cn_wh, cn_wv):
                                if (cwx, cwy, cd) not in wall_set:
                                    action_idx = 81 + (cwy * 9 + cwx) if cd == 0 else 162 + (cwy * 9 + cwx)
                                    actions.append((action_idx, 0.8))
                                    wall_set.add((cwx, cwy, cd))

        random.shuffle(actions)
        return actions

    @staticmethod
    def _apply_action_bitwise(state, action_idx):
        pos0, pos1, wcnt0, wcnt1, wall_h, wall_v, turn, pivot_mask = state
        next_turn = 1 - turn

        if action_idx < 81:
            dest = action_idx
            if turn == 0:
                return (dest, pos1, wcnt0, wcnt1, wall_h, wall_v, next_turn, pivot_mask)
            else:
                return (pos0, dest, wcnt0, wcnt1, wall_h, wall_v, next_turn, pivot_mask)
        elif action_idx < 162:
            idx = action_idx - 81
            new_wall_h = wall_h | (1 << idx)
            wx, wy = idx % 9, idx // 9
            pivot = wy * 8 + wx
            new_pivot = pivot_mask | (1 << pivot)
            if turn == 0:
                return (pos0, pos1, wcnt0 - 1, wcnt1, new_wall_h, wall_v, next_turn, new_pivot)
            else:
                return (pos0, pos1, wcnt0, wcnt1 - 1, new_wall_h, wall_v, next_turn, new_pivot)
        else:
            idx = action_idx - 162
            new_wall_v = wall_v | (1 << idx)
            wx, wy = idx % 9, idx // 9
            pivot = (wy - 1) * 8 + wx
            new_pivot = pivot_mask | (1 << pivot)
            if turn == 0:
                return (pos0, pos1, wcnt0 - 1, wcnt1, wall_h, new_wall_v, next_turn, new_pivot)
            else:
                return (pos0, pos1, wcnt0, wcnt1 - 1, wall_h, new_wall_v, next_turn, new_pivot)

    @staticmethod
    def _evaluate(state):
        pos0, pos1, wcnt0, wcnt1, wall_h, wall_v, turn, pivot_mask = state
        mover = 1 - turn

        d0 = MCTSBitwise_2113._bfs_dist_single(wall_h, wall_v, pos0, 8)
        d1 = MCTSBitwise_2113._bfs_dist_single(wall_h, wall_v, pos1, 0)

        if d0 == 999 or d1 == 999:
            return 0.0 if mover == 0 else 1.0
        if d0 == 0:
            return 1.0 if mover == 0 else 0.0
        if d1 == 0:
            return 1.0 if mover == 1 else 0.0

        d_mover = d0 if mover == 0 else d1
        d_opp = d1 if mover == 0 else d0

        w_mover = wcnt0 if mover == 0 else wcnt1
        w_opp = wcnt1 if mover == 0 else wcnt0

        wall_values = {0:0, 1:15, 2:25, 3:32, 4:37, 5:41, 6:44, 7:46, 8:48, 9:49, 10:50}
        w_mover_score = wall_values.get(w_mover, 0)
        w_opp_score = wall_values.get(w_opp, 0)
        wall_bonus = w_mover_score - w_opp_score

        score_diff = (d_opp - d_mover) * 10 + wall_bonus

        if d_mover <= 2:
            score_diff += 15
        if d_opp <= 2:
            score_diff -= 20

        sigmoid_val = 1.0 / (1.0 + math.exp(-0.06 * score_diff))
        linear_val = 0.5 + max(-0.49, min(0.49, score_diff / 200.0))

        return 0.8 * sigmoid_val + 0.2 * linear_val

    def get_decisive_move(self, state):
        pos0, pos1, wcnt0, wcnt1, wall_h, wall_v, turn, pivot_mask = state
        curr_pos   = pos0  if turn == 0 else pos1
        opp_pos    = pos1  if turn == 0 else pos0
        walls_left = wcnt0 if turn == 0 else wcnt1
        goal_y     = 8 if turn == 0 else 0
        opp_goal_y = 0 if turn == 0 else 8

        b_up, b_down, b_left, b_right = MCTSBitwise_2113._blocked(wall_h, wall_v)

        moves = MCTSBitwise_2113._valid_moves(curr_pos, opp_pos, b_up, b_down, b_left, b_right)
        for dest in moves:
            if dest // 9 == goal_y:
                return dest

        if walls_left > 0:
            opp_moves = MCTSBitwise_2113._valid_moves(opp_pos, curr_pos, b_up, b_down, b_left, b_right)
            opp_decisive = []
            for dest in opp_moves:
                if dest // 9 == opp_goal_y:
                    opp_decisive.append(dest)

            if opp_decisive:
                opp_path = [opp_pos, opp_decisive[0]]
                blocking = MCTSBitwise_2113._path_attack_walls(opp_path, wall_h, wall_v, pivot_mask, walls_left)
                for wx, wy, d in blocking:
                    idx = wy * 9 + wx
                    bit = 1 << idx
                    if d == 0:
                        n_wh, n_wv = wall_h | bit, wall_v
                    else:
                        n_wh, n_wv = wall_h, wall_v | bit
                    if MCTSBitwise_2113._has_path(pos0, pos1, n_wh, n_wv):
                        return 81 + idx if d == 0 else 162 + idx
        return None

    def search(self, root_state, time_limit=0.2):
        decisive = self.get_decisive_move(root_state)
        if decisive is not None:
            return decisive

        pos0, pos1, wcnt0, wcnt1, wall_h, wall_v, turn, pivot_mask = root_state
        curr_pos   = pos0  if turn == 0 else pos1
        opp_pos    = pos1  if turn == 0 else pos0
        opp_walls  = wcnt1 if turn == 0 else wcnt0
        goal_y     = 8 if turn == 0 else 0
        opp_goal_y = 0 if turn == 0 else 8

        curr_dist = MCTSBitwise_2113._bfs_dist(wall_h, wall_v, goal_y)
        opp_dist  = MCTSBitwise_2113._bfs_dist(wall_h, wall_v, opp_goal_y)
        my_d      = curr_dist[curr_pos]
        opp_d     = opp_dist[opp_pos]

        if opp_walls == 0 and (opp_walls == 0 and (wcnt0 if turn == 0 else wcnt1) == 0 or my_d <= opp_d):
            my_path = MCTSBitwise_2113._trace_path(curr_pos, curr_dist, goal_y, wall_h, wall_v)
            if len(my_path) > 1 and my_path[1] != opp_pos:
                return my_path[1]
            b_up, b_down, b_left, b_right = MCTSBitwise_2113._blocked(wall_h, wall_v)
            dests = MCTSBitwise_2113._valid_moves(curr_pos, opp_pos, b_up, b_down, b_left, b_right)
            best_dest = curr_pos
            best_d = 999
            for dest in dests:
                if curr_dist[dest] < best_d:
                    best_d = curr_dist[dest]
                    best_dest = dest
            return best_dest

        root_hash = root_state
        if root_hash in self.transposition_table:
            root = self.transposition_table[root_hash]

            reachable = {}
            visited_nodes = set()
            def collect(node):
                if id(node) in visited_nodes:
                    return
                visited_nodes.add(id(node))
                reachable[node.state] = node
                for child in node.children.values():
                    collect(child)
            collect(root)
            self.transposition_table = reachable
        else:
            root = MCTSNodeBitwise_2113(root_state)
            self.transposition_table = {root_hash: root}

        start = time.time()
        cnt = 0

        while True:
            if cnt & 63 == 0 and time.time() - start >= time_limit:
                break

            node = root
            search_path = [node]
            visited_ids = {id(node)}

            while node.is_fully_expanded() and node.children:
                best_uct = -1.0
                best_child = None
                for child in node.children.values():
                    uct = child.puct(node.visits)
                    if uct > best_uct:
                        best_uct = uct
                        best_child = child
                if best_child is None or id(best_child) in visited_ids:
                    break
                visited_ids.add(id(best_child))
                node = best_child
                search_path.append(node)

            node_state = node.state
            if not (node_state[0] // 9 == 8 or node_state[1] // 9 == 0):
                if node.untried is None:
                    node.untried = MCTSBitwise_2113._get_actions(node_state)

                if node.untried:
                    act_info = node.untried.pop()
                    act = act_info[0]
                    next_state = MCTSBitwise_2113._apply_action_bitwise(node_state, act)

                    if next_state in self.transposition_table:
                        child = self.transposition_table[next_state]
                    else:
                        child = MCTSNodeBitwise_2113(next_state, action=act, prior=act_info[-1])
                        self.transposition_table[next_state] = child

                    node.children[act] = child
                    node = child
                    search_path.append(node)

            val = MCTSBitwise_2113._evaluate(node.state)

            for n in reversed(search_path):
                n.visits += 1
                n.value_sum += val
                val = 1.0 - val

            cnt += 1

        if not root.children:
            my_path = MCTSBitwise_2113._trace_path(curr_pos, curr_dist, goal_y, wall_h, wall_v)
            if len(my_path) > 1 and my_path[1] != opp_pos:
                return my_path[1]
            b_up, b_down, b_left, b_right = MCTSBitwise_2113._blocked(wall_h, wall_v)
            moves = MCTSBitwise_2113._valid_moves(curr_pos, opp_pos, b_up, b_down, b_left, b_right)
            return moves[0] if moves else curr_pos

        best_act = max(root.children.items(), key=lambda x: x[1].visits)[0]
        return best_act


class QuoridorAgent_2113:
    def __init__(self, time_limit=3.5, iter=None,
                 size_x=9, size_y=9, max_walls=10, num_player=2):
        self.size_x = size_x
        self.size_y = size_y
        self.max_walls = max_walls
        self.num_player = num_player
        self.time_limit = time_limit
        self.iter = iter
        self.mcts = None
        self.my_player = None
        self.bitwise_state = None

    def _lazy_init(self):
        self.mcts = MCTSBitwise_2113()

    def _resync_sim(self, history):
        pos0, pos1 = 4, 76
        wcnt0, wcnt1 = 10, 10
        wall_h, wall_v = 0, 0
        turn = 0
        pivot_mask = 0

        state = (pos0, pos1, wcnt0, wcnt1, wall_h, wall_v, turn, pivot_mask)

        for player, action in history:
            if action[0] == 0:
                row, col = action[1], action[2]
                move = row * 9 + col
            else:
                row, col, direction = action[1], action[2], action[3]

                if direction == 0:
                    wx, wy = col, row - 1
                    move = 81 + (wy * 9 + wx)
                else:
                    wx, wy = col - 1, row + 1
                    move = 162 + (wy * 9 + wx)

            state = MCTSBitwise_2113._apply_action_bitwise(state, move)

        self.bitwise_state = state

    def call(self, *args, **kwargs):
        my_side = args[0]
        history = args[2]

        if self.mcts is None:
            self._lazy_init()

        if len(history) <= 1:
            self.mcts.transposition_table.clear()

        self._resync_sim(history)

        best = self.mcts.search(self.bitwise_state, time_limit=self.time_limit)

        if best < 81:
            return (0, best // 9, best % 9)
        elif best < 162:
            idx = best - 81
            wx, wy = idx % 9, idx // 9
            return (1, wy + 1, wx, 0)
        else:
            idx = best - 162
            wx, wy = idx % 9, idx // 9
            return (1, wy - 1, wx + 1, 1)


def fallback_2113(my_side, turn, history):
    pos = {0: (0, 4), 1: (8, 4)}
    for who, mv in history:
        if mv[0] == 0:
            pos[who] = (mv[1], mv[2])
    r, c = pos[my_side]
    goal_dir = 1 if my_side == 0 else -1
    nr = r + goal_dir
    if 0 <= nr <= 8:
        return (0, nr, c)

    for nc in (c-1, c+1):
        if 0 <= nc <= 8:
            return (0, r, nc)
    return (0, r, c)


quoridor_agent_2113 = QuoridorAgent_2113(time_limit=4.5, iter=None)


def agent_2113(my_side, turn, history):
    global quoridor_agent_2113
    try:
        return quoridor_agent_2113.call(my_side, turn, history)
    except Exception as e:
        import traceback
        traceback.print_exc()
        return fallback_2113(my_side, turn, history)