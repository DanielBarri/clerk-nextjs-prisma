export const ITEM_PER_PAGE = 10;

type RouteAccessMap = {
    [key: string]: string[];
};

export const routeAccessMap: RouteAccessMap = {
    "/admin(.*)": ["admin"],
    "/student(.*)": ["student"],
    "/teacher(.*)": ["teacher"],
    "/parent(.*)": ["parent"],
    "/home(.*)": ["admin", "student", "parent", "teacher", ""],
    "/list/plan": ["admin", "student", "parent", "teacher"],
    "/list/progress": ["admin", "student", "parent", "teacher"],
    "/list/topics": ["admin", "student", "parent", "teacher"],
    "/quiz(.*)": ["admin", "student", "parent", "teacher"],
    "/prueba(.*)": ["admin"],
    "/profile(.*)": ["admin", "student", "parent", "teacher"],
    "/api(.*)": ["admin", "student", "parent", "teacher"],
};
