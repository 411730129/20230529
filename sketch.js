let points =  [[3,4], [6,3], [8, 0],[8,-3],[6,-5],[7,-5],[8,-6],[-8,-6],[-12,-1],[-12,2],[-10,2],[-10,0],[-7,-3],[-6,-3],[-6,-1],[-4,3],[-2,+4],[3,4]]; //list資料(鯨魚)
var stroke_colors = "9376E0-E893CF-F3BCC8-F6FFA6-8696FE-CD1818-8696FE-4942E4-8696FE".split("-").map(a=>"#"+a)
var fill_colors = "00C4FF-8696FE-F2D8D8-E55807-526D82".split("-").map(a=>"#"+a)

//粒子，類別
class Obj{  //一隻某某物件的設定
  constructor(args){  //預設值
  this.p = args.p || createVector(random(width),random(height))//位置物件向量
  this.v = createVector(random(-1,1),random(-1,1))//速度向量
  this.size = random(5,10) //（大小）
  this.color = random(fill_colors)//顏色
  this.stroke = random(stroke_colors)
  }
  draw() //把物件畫出來的函數...
  {
  push()
  translate(this.p.x,this.p.y)
  scale((this.v.x<0?1:-1),-1)
  fill(this.color)//填充顏色
stroke(this.stroke)//外框顏色
strokeWeight(3)//外框粗細
beginShape()//開始畫形狀
for(var i =0;i<points.length;i=i+1){
curveVertex(points[i][0]*this.size,points[i][1]*this.size)
}
   endShape()//結束畫形狀
  pop()
  }

  update(){

  //移動的程式碼
  this.p.add(this.v)
  
  //算出滑鼠位置的向量
  let mouseV = createVector(mouseX,mouseY) //將目前滑鼠位置轉成向量值
  let delta = mouseV.sub(this.p).limit(this.v.mag()*2)
  this.p.add(delta)
  
  //碰壁的處理程式碼
  if(this.p.x<=0 || this.p.x >= width) //<0碰到左邊，>width為碰到右邊
  {
    this.v.x = -this.v.x
  }
  if(this.p.y<=0 || this.p.y >= height) //<0碰到左邊，>width為碰到右邊
  {
    this.v.y = -this.v.y
  }
  }
  isBallInRanger(){//判斷有沒有被滑鼠按到
    let d =dist(mouseX,mouseY,this.p.x,this.p.y)//計算滑鼠按下的點與此位置之間的
    if(d<this.size*8){
      return true//距離有在範圍內
    }else{
      return false//距離沒在範圍內
    }
  }
  }

  class Bullet{
    constructor(args){
        this.r = args.r || 10
        this.p = args.p ||  createVector(width/2,height/2)
        this.v = args.v || createVector(mouseX-width/2,mouseY-height/2).limit(6)
        this.color = args.color || "blue"

    }
    draw(){
        push()
        translate(this.p.x,this.p.y)
        fill(this.color)
        noStroke()
        ellipse(0,0,this.r)   
        pop()
    }
    update(){
        this.p.add(this.v)
    }
}


  var ball //代表單一個物件，利用這個變數來做正在處理的物件
  var balls = [] //陣列，放所有的物件資料
  var bullet
var bullets = []
var score = 0

  function setup(){ 
  createCanvas(windowWidth,windowHeight)
    for(j=0;j<20;j=j+1){ //產生20個物件
    ball = new Obj({})
    balls.push(ball)
  }
  }
  
  function draw(){
    background(220);
  
    for(let ball of balls){
    ball.draw()
    ball.update()
    for(let bullet of bullets){
      if(ball.isBallInRanger(bullet.p.x,bullet.p.y))
      {
        score = score +1
        balls.splice(balls.indexOf(ball),1)
        bullets.splice(bullets.indexOf(bullet),1)
  
      }
    }
    }
  for(let ballet of bullets){
    ballet.draw()
    ballet.update()
  }
  
  textSize(50)//計分板大小
  text(score,50,50)

  function mousePressed(){
    bullet = new Bullet({})
    bullets.push(bullet)
    }

  push()
  let dx = mouseX-width/2
  let dy = mouseY-height/2
  let angle = atan2(dy,dx)

  translate(width/2,height/2)
  rotate(angle)
  noStroke()
  fill("#ACBCFF")//顏色
  ellipse(0,0,60)
  fill("#643843")
  triangle(50,0,-25,-25,-25,25)
  pop()
}


function mousePressed(){
  bullet = new Bullet({})
  bullets.push(bullet)
  }