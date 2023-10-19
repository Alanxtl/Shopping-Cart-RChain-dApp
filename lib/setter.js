const rho_deploy = require('./rho_deploy.js');

const new_deploy = async (name) => {
    
    let rho_code = `
        new message${name} in {
            contract @{"global_factory_${name}"}(get${name}, set${name}) = {
                contract get${name}(ret${name}) = {
                    for (msg${name} <- message${name}){
                        ret${name}!(*msg${name})
                        |
                        message${name}!(*msg${name})
                    }
                }
                |
                contract set${name}(newMessage${name}) = {
                    for (msg${name} <- message${name}) {
                        message${name}!(*newMessage${name})
                    }
                }
            }
            |
            message${name}!("Hello")
        }
    `;

    rho_deploy.func_deploy(rho_code, -1);
}

const getter = async (name) => {
    let rho_code = `
    new get${name}, set${name}, message${name} in {
        @{"global_factory_${name}"}!(*get${name}, *set${name})
        |
        get${name}!(*message${name})
      }
      `;
    

    return rho_deploy.func_deploy(rho_code, 2).then(
        (ret) => {
            var src = "/get/1/" + name + "/" + "ret";

            console.log(src);

            return ret;
        }
    );     
}

const setter = async (name, req) => {
    let rho_code = `new get${name}, set${name} in {
        @{"global_factory_${name}"}!(*get${name}, *set${name})
        |
        set${name}!("${req}")
      }`;


    
    return rho_deploy.func_deploy(rho_code, 2).then(
        (ret) => {
            // var src = "/get/1/" + name + "/" + "ret";

            // console.log(src);
            console.log(name + " " + ret);

            return ret;
        }
    );    
}

module.exports = {
	getter,
    setter,
    new_deploy
};