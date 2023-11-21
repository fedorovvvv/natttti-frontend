import { pb } from "$shared/api/pocketbase";
import type { IProject } from "../types";

export const getProjectsCollection = () => pb.collection('projects') //deprecated