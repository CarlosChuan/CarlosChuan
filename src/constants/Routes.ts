type ProjectSubPages = "cpu_sim_ide"
type ProjectRouteNames = "project_root" | "sudoku" | "computer_sim" | "cpu_sim";
type GeneralRouteNames = "bio";
type HomeRouteNames = "home_root";

type RouteNames =
	| "root"
	| GeneralRouteNames
	| ProjectRouteNames
	| ProjectSubPages
	| HomeRouteNames;

interface RouteNodeInterface {
	id: RouteNames;
	value: string;
	children?: Array<RouteNodeInterface>;
}

class Routing {
	root: RouteNodeInterface;

	/**
	 * Used when trying to retrieve the full path for a specific route.
	 * For example, if trying to retrieve the sudoku project route, it would return (in v0.1.0):
	 * "/chuan/projects/sudoku"
	 *
	 * @param route_name The name of the route (use ROUTE_NAME)
	 * @returns The specified route using DFS search through the route tree.
	 */
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
				if (value) break;
			}
			if (value) {
				return tree.value ? `/${tree.value}${value}` : value;
			}
		}
	};

	/**
	 * It returns the value of the routeName specified. Used when creating the component tree based on the route.
	 * For example, if asking for the routeName of sudoku from the project sections, it would give (in v0.1.0)
	 * "/sudoku" if isWrapper = false || "/sudoku/*" if isWrapper = true
	 *
	 * @param routeName The id of the route value
	 * @param isWrapper If the route will be used to contain other routes or is a route without children
	 * @returns Returns the route with "/*" if isWrapper was true.
	 */
	getValue = (routeName: RouteNames, isWrapper?: boolean): string => {
		const value = this.getValueRecursive(routeName, this.root);
		if (!value) {
			return `/${isWrapper ? `*` : ``}`;
		}

		return `/${value}${isWrapper ? `/*` : ``}`;
	};

	private getValueRecursive = (
		route_name: RouteNames,
		tree: RouteNodeInterface,
	): string | void => {
		if (tree.id === route_name) {
			return tree.value;
		} else if (tree.children) {
			let value;
			for (const childTree of tree.children) {
				value = this.getValueRecursive(route_name, childTree);
				if (value) break;
			}
			if (value) {
				return value;
			}
		}
	};

	// printTree = () => {};

	// private printTreeRecursive = (tree: RouteNodeInterface) => {};

	constructor() {
		this.root = {
			id: "root",
			value: "",
			children: [
				{
					id: "home_root",
					value: "h",
				},
				{
					id: "project_root",
					value: "projects",
					children: [
						{
							id: "sudoku",
							value: "sudoku",
						},
						{
							id: "computer_sim",
							value: "computer_sim",
						},
						{
							id: "cpu_sim",
							value: "cpu_sim",
							children: [
								{
									id: "cpu_sim_ide",
									value: "ide",
								}
							]
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
export const ROUTES_DICT = {
	ROOT: "root" as RouteNames,
	HOME: {
		ROOT: "home_root" as RouteNames,
	},
	PROJECTS: {
		ROOT: "project_root" as RouteNames,
		SUDOKU: "sudoku" as RouteNames,
		COMPUTER_SIM: "computer_sim" as RouteNames,
		CPU_SIM: {
			ROOT: "cpu_sim" as RouteNames,
			IDE: "cpu_sim_ide" as RouteNames,
		},
	},
	GENERAL: {
		BIO: "bio" as RouteNames,
	},
};
