type ProjectRouteNames = "project_root" | "sudoku" | "processor";
type GeneralRouteNames = "bio";
type RouteNames = "root" | GeneralRouteNames | ProjectRouteNames;

interface RouteNodeInterface {
	id: RouteNames;
	value: string;
	children?: Array<RouteNodeInterface>;
}

class Routing {
	root: RouteNodeInterface;

	// To find the route I will do a DFS
	getRoute = (route_name: RouteNames): string => {
		return this.getRouteRecursive(route_name, this.root, 0) ?? "/";
	};

	private getRouteRecursive = (
		route_name: RouteNames,
		tree: RouteNodeInterface,
		layer: number,
	): string | void => {
		if (tree.id === route_name) {
			return `/${tree.value}`;
		} else if (tree.children) {
			let value;
			for (const childTree of tree.children) {
				value = this.getRouteRecursive(route_name, childTree, layer + 1);
				if (value) {
					break;
				}
			}
			if (value) {
				return `/${tree.value}${value}`;
			}
		}
	};

	printTree = () => {};

	private printTreeRecursive = (tree: RouteNodeInterface) => {};

	constructor() {
		this.root = {
			id: "root",
			value: "h",
			children: [
				{
					id: "project_root",
					value: "projects",
					children: [
						{
							id: "sudoku",
							value: "sudoku",
						},
					],
				},
				{
					id: "bio",
					value: "bio",
				},
			],
		};
	}
}

export const routes = new Routing();
export const ROUTE_NAME = {
	ROOT: "root" as RouteNames,
	PROJECTS: {
		ROOT: "project_root" as RouteNames,
		SUDOKU: "sudoku" as RouteNames,
		PROCESSOR: "processor" as RouteNames,
	},
	GENERAL: {
		BIO: "bio" as RouteNames,
	},
};
