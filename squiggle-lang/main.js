(function () {
    'use strict';
    function $get(obj, k) {
        if (obj === null || obj === undefined) {
            throw new Error('cannot get ' + k + ' of ' + obj);
        }
        var v = obj[k];
        if (v !== undefined) {
            return v;
        }
        throw new Error('key ' + k + ' is undefined in ' + obj);
    }
    var $global = (1, eval)('this');
    return $get($global, 'console')['log']('Hello, world!');
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uc3FnIl0sIm5hbWVzIjpbIiRnbG9iYWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Z0JBQUNBLE8sRUFBTyxTLENBQVEsUUFBSSxlQUFKLEMiLCJzb3VyY2VzQ29udGVudCI6WyJnbG9iYWwuY29uc29sZS5sb2coXCJIZWxsbywgd29ybGQhXCIpXG4iXX0=
