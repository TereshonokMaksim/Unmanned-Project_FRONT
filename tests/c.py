'''
    SPACE - next step
    R - new map
'''


import json
import math as np
import random


STOP_ON_FIRST_FIND = True
STEP_BY_STEP = True
LOAD_FROM_FILE = False
LOAD_FROM_FILE_NAME = "map.json"

game_map: list[list[int]] = []
end_point: list[int] = [0,0]
start_point: list[int] = [0,9]
def load_map(file_name: str):
    global game_map, start_point, end_point
    with open(file_name, "r", encoding="utf8") as file:
        data = json.load(file)
        game_map = data['map']
        start_point = data['start_point']
        end_point = data["end_point"]
        game_map[end_point[1]][end_point[0]]=-1

def random_map(size: list[int], wall_fill: float = 0.4):
    global game_map, map_size
    game_map = [[int(random.random() < wall_fill) for i in range(size[0])] for j in range(size[1])]
    map_size = [len(game_map[0]), len(game_map)]
    game_map[end_point[1]][end_point[0]]=-1

def reset():
    random_map(map_size)
    global step_allowed, found, pathfinders
    pathfinders = {0: PathFinder(start_point)}
    step_allowed = True
    found = False

if LOAD_FROM_FILE: load_map("map.json"); map_size=[len(game_map[0]),len(game_map)]
else: map_size=[10,10];random_map(map_size)

found: bool = False
pathfinders = {}
class PathFinder:
    def __init__(self, current_pos: list[int], active: bool = True):
        # snake based
        self.current_pos = current_pos
        self.mark()
        self.active = active
        self.id = len(pathfinders)
        pathfinders[self.id]=self
        self.check_underneath()

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
            self.active=False
            return False
        else:
            if len(cells)>1:
                for cell in cells[1:]: PathFinder([self.current_pos[0]+cell[0],self.current_pos[1]+cell[1]])
            # print(cells)
            self.current_pos[0]+=cells[0][0]; self.current_pos[1]+=cells[0][1]
            self.mark()
            self.check_underneath()

    def mark(self):
        game_map[self.current_pos[1]][self.current_pos[0]]=2

    def check_underneath(self):
        if self.round_check(look = -1):
            global found; found = True
        # elif game_map[self.current_pos[1]][self.current_pos[0]]==0:game_map[self.current_pos[1]][self.current_pos[0]]=2

def search():
    if not found: 
        for pt in list(pathfinders.keys()).copy(): pathfinders[pt].find()


# INTERFACE

import pygame


pygame.init()

SIZE = [500, 500]
GAME_AREA_SIZE = [300, 300]
WINDOW_TITLE = "whatever"
FPS = 100

CELL_SIZE=[np.floor(GAME_AREA_SIZE[0]/map_size[0]),np.floor(GAME_AREA_SIZE[1]/map_size[1])]
screen = pygame.display.set_mode(SIZE)
pygame.display.set_caption(WINDOW_TITLE)
fps_font = pygame.font.SysFont("Arial", 20)
fps_surface = pygame.Surface([1,1])
game_surface = pygame.Surface(GAME_AREA_SIZE)
game_surface_pos = [(SIZE[0]-GAME_AREA_SIZE[0])//2,(SIZE[1]-GAME_AREA_SIZE[1])//2]
clock = pygame.time.Clock()
run = True
tick = 0

step_allowed=True
COLORS=[[100,100,100],[255,255,255],[0,255,0],[0,0,0],[255,255,0]]
def show():
    p=[0,0]
    for cell_row in range(len(game_map)):
        for cell_column in range(len(game_map[0])):
            pygame.draw.rect(game_surface,COLORS[game_map[cell_row][cell_column]],[*p,*CELL_SIZE])
            p[0]+=CELL_SIZE[0]
        p[1]+=CELL_SIZE[1]
        p[0]=0
pathfinders[0]=PathFinder(start_point.copy())

while run:
    tick += 1
    clock.tick(FPS)
    for event in pygame.event.get():
        if event.type == pygame.QUIT: run=False
        if event.type == pygame.KEYDOWN: 
            if event.unicode==" ":
                step_allowed=True
            elif event.unicode=="r":
                reset()
    # CLEAR
    screen.fill([[0, 0, 0], [125, 125, 125]][found])
    if step_allowed:game_surface.fill([0, 0, 0])
    # CODE
    if step_allowed:
        search()
        show()
        step_allowed=False
    # SHOW
    if not tick % 10: fps_surface = fps_font.render(f"FPS: {round(clock.get_fps())}",True,(255, 255, 255))
    screen.blit(game_surface,game_surface_pos)
    screen.blit(fps_surface,[10,10])
    pygame.display.flip()