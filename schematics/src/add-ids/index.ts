import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency, NodeDependencyType } from '@schematics/angular/utility/dependencies';
import { getLatestPackageVersion } from '../util/npm';


export function addIDS(_options: any): Rule {
   return async (tree: Tree, context: SchematicContext) => {
      await addIDSPackage(tree, context);
      await installDependencies(tree, context);
   };
}

async function addIDSPackage(tree: Tree, context: SchematicContext) {
   const idsPackage = await getLatestPackageVersion('ids-enterprise-ng');
   context.logger.info(`Add ${idsPackage.name}@${idsPackage.version}`);
   addPackageJsonDependency(tree, {
      name: idsPackage.name,
      version: idsPackage.version,
      type: NodeDependencyType.Default,
      overwrite: false,
   });
}

async function installDependencies(_tree: Tree, context: SchematicContext) {
   context.logger.info('Install dependencies');
   context.addTask(new NodePackageInstallTask());
}
