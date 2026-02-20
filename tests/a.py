'''
    SPACE - next step
    R - new map
'''

import time
import json
import math as np
import random
import pygame


pygame.init()

# CONFIG - KEYBOARD

NEXT_STEP_KEY = "n"
AUTO_STOP_KEY = " "
RANDOM_MAP_KEY = "r"
AUTO_RESTART_KEY = "q"
'''
    Application will automatically make random map
    and make restart if AUTO_RESTART is on
'''
SHOW_FAILS_KEY = "e"
SPEED_UP_KEY = "'"
SPEED_DOWN_KEY = "/"

# CONFIG - TECHNICAL

STOP_ON_FIRST_FIND = True
step_by_step = False
'''
    If step_by_step is False, then the solver will begin working autonomously.
    Note, that if step_by_step is False you still can use NEXT_STEP_KEY to 
        force next step to happen that time
'''
auto_restart = False
AUTO_SPEED=0
'''
    Required to defined speed of automatic solver (when step_by_step is false)
    The speed is defined as 1/AUTO_SPEED seconds. 
    Setting 0 will mean solver will try to make action every single frame.
'''
LOAD_FROM_FILE = False
LOAD_FROM_FILE_NAME = "map.json"
DEBUG_CELL_NUMBERS = False
STAT_UPDATE_TIME = 2
'''
    Number of frames between updates of statistics.
    Example: if STAT_UPDATE_TIME is 10 and FPS is 100, that means that
      statistic update will happen every 0.1 seconds (in ideal conditions)
'''

# CONFIG - RANDOM MAP GENERATOR

AUTO_POINT_SELECT = True
'''
    If set to false, then user should manually 
    select end_point (finish) and start_point (start)
'''
WALL_DENSITY = 0.35
ALLOWED_SIZE = [60, 60]

# CONFIG - VISUAL

show_failed_paths = True

# CONFIG - VISUAL ADDITIONAL

SIZE = [900, 600]
GAME_AREA_SIZE = [600, 600]
WINDOW_TITLE = "whatever"
FPS = 100

# MAIN CODE

found: bool = False
pathfinders = {}
pt_id=0
path_map: list[list[int]] = []
game_map: list[list[int]] = []
end_point: list[int] = [0,0]
start_point: list[int] = [0,9]
CELL_SIZE=[0,0]

def win(by: int):
    # by - PathFinder id
    global found
    if STOP_ON_FIRST_FIND:
        for pt in list(pathfinders.values()).copy(): 
            if pt.id != by: pt.kill()
    if auto_restart: reset()

def simulation_update(successfull: bool):
    global last_sim_duration, avg_time, sim_start_time, simulation_num, simulations_completed, avg_pts, avg_steps
    last_sim_duration = time.time() - sim_start_time
    last_sim_duration = round(last_sim_duration, max(3 - len(str(int(last_sim_duration))), 0))
    avg_time = round((avg_time * simulation_num + last_sim_duration) / (simulation_num + 1), 1)
    avg_steps = round((avg_steps * simulation_num + step) / (simulation_num + 1))
    avg_pts = round((avg_pts * simulation_num + pt_id) / (simulation_num + 1))
    sim_start_time = time.time()
    simulation_num+=1
    if successfull: simulations_completed+=1

class Path:
    def __init__(self, cells: list[list[int]]=[]):
        self.cells=[]
        for cell in cells: self.add_cell(cell)
        self.active_pathfinders=[]

    def is_dead(self): return not len(self.active_pathfinders)

    def add_cell(self, new_cell: list[int]):
        path_map[new_cell[1]][new_cell[0]]=self
        self.cells.append(new_cell)


class PathFinder:
    def __init__(self, current_pos: list[int], active: bool = True, paths: list[Path] = []):
        # fluid based
        global pt_id
        self.id = pt_id
        pathfinders[self.id]=self
        pt_id+=1
        self.paths = []
        self.active = active
        self.current_pos = current_pos
        for path in [*paths, Path([current_pos])]: self.add_path(path)
        self.mark()
        self.check_win()

    @property
    def x(self): return self.current_pos[0]
    @property
    def y(self): return self.current_pos[1]

    def add_path(self, path: Path):
        self.paths.append(path)
        path.active_pathfinders.append(self)

    def round_check(self, collect_all: bool = False, look: int = 0) -> list[list[int]]:
        # returns [0,0] if there is no available cell around
        p = self.current_pos
        pc=[3,3,3,3]
        if p[1]>0:pc[0]=game_map[p[1]-1][p[0]]
        if p[0]<map_size[0]-1:pc[1]=game_map[p[1]][p[0]+1]
        if p[1]<map_size[1]-1:pc[2]=game_map[p[1]+1][p[0]]
        if p[0]>0:pc[3]=game_map[p[1]][p[0]-1]
        an=[[0,-1],[1,0],[0,1],[-1,0]]
        if not collect_all and look in pc: return an[pc.index(look)]
        elif look in pc: return [an[ind] for ind in range(4) if not pc[ind]] 
        return []


    def find(self) -> bool:
        if not self.active: return False
        if STOP_ON_FIRST_FIND and found: return False
        cells=self.round_check(True)
        if not len(cells): 
            self.kill()
        else:
            if len(cells)>1:
                for cell in cells[1:]: PathFinder([self.current_pos[0]+cell[0],self.current_pos[1]+cell[1]],True,[*self.paths])
                self.add_path(Path([]))
            self.current_pos[0]+=cells[0][0]; self.current_pos[1]+=cells[0][1]
            self.mark()
            self.check_win()

    def kill(self):
        self.active = False
        for path in self.paths:
            path.active_pathfinders.remove(self)
        del pathfinders[self.id]

    def mark(self):
        game_map[self.current_pos[1]][self.current_pos[0]]=2
        self.paths[-1].add_cell(self.current_pos.copy())

    def check_win(self):
        global found
        if self.round_check(look = -1) and not found: 
            found = True
            return True
        return False
            

def search():
    if not found: 
        if len(pathfinders) == 0: reset()
        for pt in list(pathfinders.keys()).copy(): 
            pathfinders[pt].find()
            if found and STOP_ON_FIRST_FIND: win(pt); break

# LOADING

def load_map(file_name: str):
    global game_map, start_point, end_point
    with open(file_name, "r", encoding="utf8") as file:
        data = json.load(file)
        game_map = data['map']
        start_point = data['start_point']
        end_point = data["end_point"]
        game_map[end_point[1]][end_point[0]]=-1

def random_map():
    global game_map, map_size, start_point, end_point
    game_map = []
    free_cells_list = []
    for game_map_row in range(ALLOWED_SIZE[1]):
        game_map.append([])
        for game_map_column in range(ALLOWED_SIZE[0]):
            val=int(random.random() < WALL_DENSITY)
            game_map[-1].append(val)
            if val==0:free_cells_list.append([game_map_column,game_map_row])
    map_size = [len(game_map[0]), len(game_map)]
    if AUTO_POINT_SELECT:
        start_point=random.choice(free_cells_list)
        free_cells_list.remove(start_point)
        candidates=[[start_point[0],start_point[1]+1],[start_point[0]+1,start_point[1]],[start_point[0],start_point[1]-1],[start_point[0]-1,start_point[1]]]
        for c in candidates: 
            try: free_cells_list.remove(c)
            except: pass
        end_point=random.choice(free_cells_list)
    game_map[end_point[1]][end_point[0]]=-1

def regenerate_settings():
    global map_size, step_allowed, found, pathfinders, path_map, CELL_SIZE, pt_id
    pt_id=0
    map_size=[len(game_map[0]), len(game_map)]
    CELL_SIZE=[np.floor(GAME_AREA_SIZE[0]/map_size[0]),np.floor(GAME_AREA_SIZE[1]/map_size[1])]
    path_map=[[None for i in range(map_size[0])]for i in range(map_size[1])]
    step_allowed=True
    found=False
    pathfinders.clear()
    PathFinder(start_point.copy())

def reset():
    global step
    simulation_update(len(pathfinders) > 0)
    random_map()
    regenerate_settings()
    step=0

if LOAD_FROM_FILE: load_map("map.json");regenerate_settings()
else: random_map(); regenerate_settings()
if not len(pathfinders): PathFinder(start_point.copy())

# INTERFACE - SETTING

COLORS={"clean_path": [100,100,100],
        "wall": [255,255,255],
        "NOT IN USE": [0,0,0],
        "finish": [0,0,255],
        "active_path": [0,155,0],
        "deleted_path": [220,0,0],
        "start": [0, 255, 255],
        "pathfinder_head": [100, 255, 100]}
deleted_path_color = COLORS["deleted_path"]
def draw_cell(vx:int,vy:int,tx:int,ty:int,spec_color:list[int]=None):
    '''
        tx,ty - params for position of cell in table (not visual, unlike vx and vy)
    '''
    color=spec_color
    if not color:
        if game_map[ty][tx]==1:color=COLORS["wall"]
        else: 
            if path_map[ty][tx]: 
                if path_map[ty][tx].is_dead():
                    color = deleted_path_color
                else:
                    color=COLORS["active_path"]
            else: color=COLORS["clean_path"]
    pygame.draw.rect(game_surface,color,[vx,vy,*CELL_SIZE])
    if DEBUG_CELL_NUMBERS:
        if path_map[ty][tx]:
            game_surface.blit(check_font.render(str(len(path_map[ty][tx].active_pathfinders)),True,(255,255,255)),[vx+2,vy+2])
def show():
    global deleted_path_color
    if show_failed_paths:deleted_path_color=COLORS["deleted_path"]
    else:deleted_path_color=COLORS["clean_path"]
    p=[0,0]
    for cell_row in range(len(game_map)):
        for cell_column in range(len(game_map[0])):
            draw_cell(*p, cell_column, cell_row)
            p[0]+=CELL_SIZE[0]
        p[1]+=CELL_SIZE[1]
        p[0]=0
    pygame.draw.rect(game_surface,COLORS["finish"],[end_point[0]*CELL_SIZE[0],end_point[1]*CELL_SIZE[1],*CELL_SIZE])
    pygame.draw.rect(game_surface,COLORS["start"],[start_point[0]*CELL_SIZE[0],start_point[1]*CELL_SIZE[1],*CELL_SIZE])
    for pt in pathfinders.values(): 
        draw_cell(pt.x*CELL_SIZE[0],pt.y*CELL_SIZE[1],0,0,COLORS["pathfinder_head"])
        if DEBUG_CELL_NUMBERS: game_surface.blit(check_font.render(str(pt.id),True,(0,0,0)),[pt.x*CELL_SIZE[0]+2,pt.y*CELL_SIZE[1]+2])

# INTERFACE - PYGAME PART

screen = pygame.display.set_mode(SIZE)
pygame.display.set_caption(WINDOW_TITLE)
fps_font = pygame.font.SysFont("Arial", 20)
check_font=pygame.font.SysFont("Arial", 12)
fps_surface = pygame.Surface([1,1])
stat_font = pygame.font.SysFont("Arial", 16)
stats_surfaces = []
game_surface = pygame.Surface(GAME_AREA_SIZE)
game_surface_pos = [SIZE[0]-GAME_AREA_SIZE[0],SIZE[1]-GAME_AREA_SIZE[1]]
clock = pygame.time.Clock()
run = True
step_allowed=True
tick = 0

# STAT DATA

step = 0
sim_start_time = time.time()
last_sim_duration = 0
simulation_num = 0
simulations_completed = 0
avg_time = 0
avg_steps = 0
avg_pts = 0
def get_stat_data() -> list[str]:
    options_header = "---------- OPTIONS ----------"
    speed_text = f"Speed: {AUTO_SPEED}"
    auto_restart_text = f"Auto restart on: {auto_restart}"
    fail_color_text = f"Failed paths on: {show_failed_paths}"
    stats_header = "---------- STATISTICS ----------"
    pt_total = f"Pathfinders created: {pt_id}"
    pt_active = f"Pathfinders active: {len(pathfinders)}"
    step_text = f"Total steps: {step}"
    state = f"Status: {'found' if found else ('In Progress' if len(pathfinders) > 0 else 'No Solution')}"
    sim_divider = "---------- SIMULATION STATS ----------"
    sims_total = f"Simulations finished: {simulation_num}"
    sims_completed = f"Simulations suceeded: {simulations_completed}"
    sims_failed = f"Simulations failed: {simulation_num - simulations_completed}"
    last_sim_durtext = f"Last simulation duration: {last_sim_duration} s"
    avg_divider = "----- AVERAGE STATS -----"
    avg_time_text = f"Average time per simulation: {avg_time} s"
    avg_steps_text = f"Average steps per simulation: {avg_steps}"
    avg_pts_text = f"Average PathFinders per simulation: {avg_pts}"
    return [options_header,
                speed_text,
                auto_restart_text,
                fail_color_text,
            stats_header, 
                pt_total, 
                pt_active, 
                step_text, 
                state, 
            sim_divider, 
                sims_total, 
                sims_completed, 
                sims_failed, 
                last_sim_durtext, 
            avg_divider, 
                avg_time_text, 
                avg_steps_text, 
                avg_pts_text]

# INTERFACE - APPLICATION EVENT PROCESSOR

while run:
    tick += 1
    clock.tick(FPS)
    for event in pygame.event.get():
        if event.type == pygame.QUIT: run=False
        if event.type == pygame.KEYDOWN: 
            if event.unicode==NEXT_STEP_KEY:
                step_allowed=True
            elif event.unicode==RANDOM_MAP_KEY:
                reset()
            elif event.unicode==AUTO_STOP_KEY:
                step_by_step=[True,False][step_by_step]
            elif event.unicode==AUTO_RESTART_KEY:
                auto_restart=[True,False][auto_restart]
            elif event.unicode==SHOW_FAILS_KEY:
                show_failed_paths=[True,False][show_failed_paths]
            elif event.unicode==SPEED_UP_KEY:
                AUTO_SPEED+=1
            elif event.unicode==SPEED_DOWN_KEY:
                AUTO_SPEED=max(0,AUTO_SPEED-1)
    # CLEAR
    screen.fill([[0, 0, 0], [125, 125, 125]][found])
    if step_allowed:game_surface.fill([0, 0, 0])
    # CODE
    if not step_by_step:
        if AUTO_SPEED==0:
            step_allowed = True
        elif not tick%(int(FPS/AUTO_SPEED)):
            step_allowed = True
    if step_allowed:
        search()
        show()
        if not found: step += 1 
        step_allowed=False
    # SHOW
    if not tick % STAT_UPDATE_TIME: 
        stats_surfaces.clear()
        fps_surface = fps_font.render(f"FPS: {round(clock.get_fps())}",True,(255, 255, 255))
        for stat_text in get_stat_data():
            stats_surfaces.append(stat_font.render(stat_text, True,(255,255,255)))
    screen.blit(game_surface,game_surface_pos)
    stat_y=fps_surface.get_height()+10+2
    for stat in stats_surfaces:
        screen.blit(stat,[10,stat_y])
        stat_y+=stat.get_height()
    screen.blit(fps_surface,[10,10])
    pygame.display.flip()