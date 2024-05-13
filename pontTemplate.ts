import { CodeGenerator, Interface } from 'pont-engine';

export default class MyGenerator extends CodeGenerator {
  // custom your generator here
  /** 获取接口实现内容的代码 */
  getInterfaceContent(inter: Interface) {
    const bodyParmas = inter.getBodyParamsCode();
    const requestParams = bodyParmas ? `params, bodyParams` : `params`;

    return `
    /**
     * @desc ${inter.description}
     */

    import * as defs from '../../baseClass';
    import {pontFetch} from 'src/utils/pontFetch';

    export ${inter.getParamsCode()}
    export const init = ${inter.response.initialValue};

    export async function request(${requestParams}) {
      return pontFetch({
        url: '${inter.path}',
        ${bodyParmas ? 'params: bodyParams' : 'params'},
        method: '${inter.method}',
      });
    }
   `;
  }


  /** 获取所有模块的 index 入口文件 */
  getModsIndex() {
    let conclusion = `
      declare var window;

      window.API = {
        ${this.dataSource.mods.map(mod => mod.name).join(', \n')}
      };
    `;

    // dataSource name means multiple dataSource
    if (this.dataSource.name) {
      conclusion = `
        export const ${this.dataSource.name} = {
          ${this.dataSource.mods.map(mod => mod.name).join(', \n')}
        };
      `;
    }

    return `
      ${this.dataSource.mods
        .map(mod => {
          return `import * as ${mod.name} from './${mod.name}';`;
        })
        .join('\n')}

      ${conclusion}
    `;
  }
}
