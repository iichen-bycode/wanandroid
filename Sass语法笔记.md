### 基本使用
    - sass xx.scss xx.css  编译文件为原始的 css
    - sass --watch xxx.scss:xxx.css  和typeScript类似，编辑自动保存编译
        

### Css拓展
    - & 表示嵌套的外层父选择器
        `
        a {
            &:hover{

            }            
        }
        `
    
    - &作为选择器的第一个字符，其后跟随生成复合选择器
        #main {
            color: black;
            &-sidebar { border: 1px solid; }
        }
        =>
        #main {
            color: black; 
        }
        #main-sidebar {
            border: 1px solid; 
        }

    - 相同前缀简写 嵌套
        .funky {
            font: 20px/24px {
                family: fantasy;
                weight: bold;
            }
        }
        =>
        .funky {
            font: 20px/24px {
                family: fantasy;
                weight: bold;
            }
        }

### SassScript
    #main {
        // 不在其块级作用域下 需要加上 !global 设为全局
        $width: 5em !global;
        width: $width;
    }
    
    #sidebar {
        width: $width;
    }

    - 可直接在scss内 属性进行运算
        p {
            width: 1in + 8pt;
        }
    
    - / 符号转义 => 使用 #{} 包裹
        p {
            $font-size: 12px;
            $line-height: 30px;
            font: #{$font-size}/#{$line-height};
        }
    
    - 字符串运算 拼接
        p {
            cursor: e + -resize;
        }
        =>
        p {
            cursor: e-resize;
        }
        
    - 引号 在 ‘+’ 位置的不同
        p:before {
            content: "Foo " + Bar;      => "Foo Bar"
            font-family: sans- + "serif"; => sans-serif
        }

### 导入
    - @import "foo.scss";

### @extend 继承样式
    .error {
        border: 1px #f00;
        background-color: #fdd;
    }
    .seriousError {
        @extend .error;  // 等同于将上面的样式 复制放到这里
        border-width: 3px;
    }

### 逻辑控制
    - @if   （当 @if 的表达式返回值不是 false 或者 null 时，条件成立，输出 {} 内的代码）
        p {
            @if 1 + 1 == 2 { border: 1px solid; }       ==> 成立
            @else if 5 < 3 { border: 2px dotted; }
            @else null  { border: 3px double; }
        }

    - @for
       -- @for $var from <start> through <end> 
       -- @for $var from <start> to <end>
        
        @for $i from 1 through 3 {
            .item-#{$i} { width: 2em * $i; }
        }


    - @each
        @each $animal in puma, sea-slug, egret, salamander {
            .#{$animal}-icon {
                background-image: url('/images/#{$animal}.png');
            }
        }

    - @while
        $i: 6;
        @while $i > 0 {
            .item-#{$i} { width: 2em * $i; }
            $i: $i - 2;
        }

### 混合指令 @mixin  复用重复样式
    - 与 @extend的不同，@extend是 一个确切的样式定义  @mixin只是定义 不是确切使用的，需要 @include才真正引入
        @mixin large-text {
            font: {
                family: Arial;
                size: 20px;
                weight: bold;
            }
            color: #ff0000;
        }

        .page-title {
            @include large-text;        
            padding: 4px;
            margin-top: 10px;
        }
   
    - 参数形 写法                            ... 接受多个参数
        @mixin sexy-border($color, $width,$shadows...) {
            border: {
                color: $color;
                width: $width;
                style: dashed;
            }
        }
        p { @include sexy-border(blue, 1in); }