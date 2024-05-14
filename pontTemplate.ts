import { CodeGenerator, Interface } from 'pont-engine';

export default class MyGenerator extends CodeGenerator {
  // custom your generator here
  // private getInterfaceInDeclaration(inter: Interface) {
  //   return `
  //     /**
  //       * ${inter.description}
  //       * ${inter.path}
  //       */
  //     export namespace ${inter.name} {
  //       ${this.getInterfaceContentInDeclaration(inter)}
  //     }
  //   `;
  // }
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

    export async function request(${requestParams}):Promise<${inter.responseType}> {
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

    return `
      ${this.dataSource.mods
        .map(mod => {
          return `export * from './${mod.name}';`;
        })
        .join('\n')}

    `;
  }
}
