
// pegando os valores

const numOrig = document.querySelector('#numOriginal')
const numBaseOrig = document.querySelector('#numBaseOriginal')
const numBaseDest = document.querySelector('#numBaseDest')
const numeroParaErro = document.querySelector('#numErro')
const precisaoDoErro = document.querySelector('#digErro')

// mostrando o resultado

const numeroTruncado = document.querySelector('#numTrunc')
const numeroArred = document.querySelector('#numArred')

const numeroTruncEA = document.querySelector('#numEAtrunc')
const numeroTruncER = document.querySelector('#numERtrunc')
const numeroArredEA = document.querySelector('#numEAarred')
const numeroArredER = document.querySelector('#numERarred')
const numeroConvertido = document.querySelector('#numConvertido')

// setArredER = numeroArredER.value  
// setTruncER = numeroTruncER.value
// setArredEA = numeroArredEA.value 
// setTruncEA = numeroTruncEA.value 

let baseOriginal = 10
let baseNova = 10
let numeroOriginal = 0
let numeroNovo = 0
let numeroErro = 0
let precisaoErro = 1



// pegando os valores

numOrig.addEventListener('input',(e)=>{
   numeroOriginal = e.target.value
   numeroNovo = conversaoBase(numeroOriginal,baseOriginal,baseNova)
   numeroConvertido.value = numeroNovo
})

numBaseOrig.addEventListener('input',(e)=>{
  baseOriginal = e.target.value
  numeroNovo = conversaoBase(numeroOriginal,baseOriginal,baseNova)
  numeroConvertido.value = numeroNovo
})

numBaseDest.addEventListener('input',(e)=>{
  baseNova = e.target.value
  numeroNovo = conversaoBase(numeroOriginal,baseOriginal,baseNova)
  numeroConvertido.value = numeroNovo
})

numeroParaErro.addEventListener('input',(e)=>{
  numeroErro = e.target.value
  numeroTruncado.value = trunc(numeroErro,precisaoErro)
  numeroArred.value = round(numeroErro,precisaoErro)
  
  numeroTruncEA.value = erroAbsoluto(numeroErro,precisaoErro)[0] // 0->trunc 1->arred
  numeroTruncER.value = erroRelativo(numeroErro,precisaoErro)[0]
  numeroArredEA.value = erroAbsoluto(numeroErro,precisaoErro)[1] 
  numeroArredER.value = erroRelativo(numeroErro,precisaoErro)[1]
})

precisaoDoErro.addEventListener('input',(e)=>{
  precisaoErro = e.target.value
  numeroTruncado.value = trunc(numeroErro,precisaoErro)
  numeroArred.value = round(numeroErro,precisaoErro)

  numeroTruncEA.value = erroAbsoluto(numeroErro,precisaoErro)[0] // 0->trunc 1->arred
  numeroTruncER.value = erroRelativo(numeroErro,precisaoErro)[0]
  numeroArredEA.value = erroAbsoluto(numeroErro,precisaoErro)[1] 
  numeroArredER.value = erroRelativo(numeroErro,precisaoErro)[1]
})


// mostrando no resulado

function erroAbsoluto(res,precisao){
   let arrRespostaEA = [] // 0->trunc 1->arred
   arrRespostaEA[0] = Math.abs(res - trunc(res,precisao))
   arrRespostaEA[1] = Math.abs(res - round(res,precisao))
   return arrRespostaEA
}

function erroRelativo(res,precisao){
   let arrRespostaER = [] // 0->trunc 1->arred
   arrRespostaER[0] = Math.abs((res - trunc(res,precisao))/trunc(res,precisao))
   arrRespostaER[1] = Math.abs((res - round(res,precisao))/round(res,precisao))
   return arrRespostaER
}

// arredondamento com precisao

const round = (num, places) => {
	if (!("" + num).includes("e")) {
		return +(Math.round(num + "e+" + places)  + "e-" + places)
	} else {
		let arr = ("" + num).split("e")
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+"
		}

		return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places)
	}
}

// truncamento com precisao

const trunc = (num, places) => {
	if (!("" + num).includes("e")) {
		return +(Math.trunc(num + "e+" + places)  + "e-" + places)
	} else {
		let arr = ("" + num).split("e")
		let sig = ""
		if (+arr[1] + places > 0) {
			sig = "+"
		}

		return +(Math.trunc(+arr[0] + "e" + sig + (+arr[1] + places)) + "e-" + places)
	}
}

// bases 2 - 10 
// TODO: aumentar o range de bases

function conversaoBase(num,b1,b2){

  num = num.toString()
  numArr = num.split("",num.length)
  virgPos = numArr.indexOf(".")
  
  console.log(virgPos)
  
  // numero com 'casa decimal'
  if(numArr.indexOf(".") != -1 )
  {
    console.log('quebrado')
    intSize = virgPos
    numArr.splice(virgPos, 1)
    decSize = (numArr.length) - (intSize)
  }
  //numero inteiro
  else if(numArr.indexOf(".") == -1)
  {
    console.log('inteiro')
    intSize = numArr.length
    decSize = 0 
  }

  numConcat = 0
  index = 0

  console.log(`Numero: ${numArr}`)
  console.log(`intSize: ${intSize}`)
  console.log(`decSize: ${decSize}`)
  
  // converte da base n1 para a base 10
  for(let i = intSize - 1; i>= (-1*decSize); i--)
  {
    numConcat = numConcat + numArr[index]*(Math.pow(b1,i))
    index++
    console.log(numConcat)
  }
  // retorna da base 10 para a base n2
  return numConcat.toString(b2)
}