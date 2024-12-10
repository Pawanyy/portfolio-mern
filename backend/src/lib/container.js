import * as awilix from "awilix";
import { ServiceLoader } from "./ServiceLoader.js";

const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
    strict: true,
});

container.register({
})

await ServiceLoader("controllers", container);
await ServiceLoader("services", container);

// console.log(container.registrations)

export default container;