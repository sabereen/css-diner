/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


// Hash the array and compare the arrays!
// Key
// a = small apple .small
// A = apple
// o = small orange, .small
// O = orange
// p = small pickle, .small
// P = pickle
// () = plate open / close
// {} = fancy plate open / close
// [] = bento open close tags

var levels = [
  {
    helpTitle : "انتخاب عنصرها به‌وسیله‌ی نوعشان",
    selectorName : "انتخابگر نوع (ُType Selector)",
    doThis : "بشقاب‌ها را انتخاب کن",
    selector : "plate",
    syntax : "A",
    help : "همه‌ی عناصری را که از نوع <strong>A</strong> باشند انتخاب می‌کند. منظور ما از نوع عنصر اسم تگ است، پس <tag>div</tag>، <tag>p</tag> و <tag>ul</tag> هر کدام یک نوع عنصر هستند.",
    examples : [
      '<strong>div</strong> همه‌ی تگ‌های <tag>div</tag> را انتخاب می‌کند.',
      '<strong>p</strong> همه‌ی عناصر <tag>p</tag> را انتخاب می‌کند.'
      ],
    board: "()()"
  },
  {
    doThis : "ظرف‌های بنتو را انتخاب کن",
    selector : "bento",
    syntax : "A",
    helpTitle : "انتخاب عنصرها به‌وسیله‌ی نوعشان",
    selectorName : "انتخابگر نوع (ُType Selector)",
    help : "همه‌ی عناصری را که از نوع <strong>A</strong> باشند انتخاب می‌کند. منظور ما از نوع عنصر اسم تگ است، پس <tag>div</tag>، <tag>p</tag> و <tag>ul</tag> هر کدام یک نوع عنصر هستند.",
    examples : [
      '<strong>div</strong> همه‌ی تگ‌های <tag>div</tag> را انتخاب می‌کند.',
      '<strong>p</strong> همه‌ی عناصر <tag>p</tag> را انتخاب می‌کند.'
      ],
    board: "[]()[]"
  },
  {
    doThis : "بشقاب تزئینی را انتخاب کن",
    selector : "#fancy",
    selectorName: "انتخابگر ID",
    helpTitle: "انتخاب یک عنصر به‌وسیله‌ی ID آن",
    syntax: "#id",
    help : 'عنصری دارای صفت <strong>id</strong> را انتخاب می‌کند. ضمناً می‌توانید این انتخابگر را به صورت ترکیبی با انتخابگر نوع (Type Selector) به کار ببرید.',
    examples : [
      '<strong>#cool</strong> هر عنصری را با <strong>id="cool"</strong> انتخاب می‌کند',
      '<strong>ul#long</strong> عنصر <strong>&lt;ul id="long"&gt;</strong> را انتخاب می‌کند'
    ],
    board: "{}()[]"
  },
  {
    helpTitle: "انتخاب یک عنصر که داخل عنصر دیگری قرار دارد",
    selectorName : "انتخابگر نسل (Descendant Selector)",
    doThis : "سیب داخل بشقاب را انتخاب کن",
    selector : "plate apple",
    syntax: "A&nbsp;&nbsp;B",
    help : "همه‌ی عناصر <strong>B</strong> را که داخل <strong>A</strong> قرار دارند انتخاب می‌کند. در چنین مواقعی می‌گوییم <strong>B</strong> از نسل <strong>A</strong> است، یعنی داخل آن قرار دارد.",
    examples : [
      '<strong>p&nbsp;&nbsp;strong</strong> همه‌ی <strong>&lt;strong&gt;</strong>هایی را که داخل هر عنصر <strong>&lt;p&gt;</strong> باشند انتخاب می‌کند.',
      '<strong>#fancy&nbsp;&nbsp;span</strong> هر <strong>&lt;span&gt;</strong> را که از نسل یک عنصر با  <strong>id="fancy"</strong> باشد را انتخاب می‌کند.'
    ],
    board: "[](A)A"
  },
  {
    doThis : "خیارشور درون ظرف تزئینی را انتخاب کن",
    selector : "#fancy pickle",
    helpTitle: "ترکیب انتخابگر نسل و ID",
    syntax: "#id&nbsp;&nbsp;A",
    help : 'می‌توان هر انتخابگری را به صورت ترکیبی با انتخابگر نسل به کار برد.',
    examples : [
      '<strong>#cool&nbsp;span</strong> همه‌ی عنصرهای <strong>&lt;span&gt;</strong> را که داخل عنصری با <strong>id="cool"</strong> باشند انتخاب می‌کند'
    ],
    board: "[O]{P}(P)"
  },
  {
    doThis : "سیب‌های کوچک را انتخاب کن",
    selector : ".small",
    selectorName: "انتخابگر کلاس (Class Selector)",
    helpTitle: "عنصرها را به‌وسیله‌ی کلاسشان انتخاب می‌کند",
    syntax: ".classname",
    help : 'انتخابگر کلاس  همه‌ی عنصرهایی را که دارای صفت class مورد نظر هستند انتخاب می‌کند. عنصرها حداکثر یک آیدی دارند، ولی می‌توانند چندین کلاس داشته باشند.',
    examples : [
    '<strong>.neato</strong> همه‌ی عنصرهایی با <strong>class="neato"</strong> را انتخاب می‌کند'
    ],

    board: "Aa(a)()"
  },
  {
    doThis : "پرتقال‌های کوچک را انتخاب کن",
    selector : "orange.small",
    helpTitle: "ترکیب انتخابگر کلاس",
    syntax: "A.className",
    help : 'می‌توان انتخابگر کلاس را به صورت ترکیبی با سایر انتخابگرها مثل انتخابگر نوع به کار برد.',
    examples : [
      '<strong>ul.important</strong> همه‌ی عنصرهای <strong>&lt;ul&gt;</strong> را که دارای <strong>class="important"</strong> هستند انتخاب می‌کند',
      '<strong>#big.wide</strong> هر عنصری با <strong>id="big"</strong> که دارای <strong>class="wide"</strong> است را انتخاب می‌کند'
    ],
    board: "Aa[o](O)(o)"
  },
  {
    doThis : "پرتقال‌های کوچک درون بنتوها را انتخاب کن",
    selector : "bento orange.small",
    syntax: "از اطلاعات قبلی کمک بگیر",
    helpTitle: "شما از پس این هم بر می‌آیید...",
    help : 'برای حل این یکی می‌توانید چیزهایی را که در مرحله‌های قبل یاد گرفتید با هم ترکیب کنید',
    board: "A(o)[o][a][o]"
  },
  {
    doThis : "همه‌ی بشقاب‌ها و بنتوها را انتخاب کن",

    selector : "plate,bento",
    selectorName : "ترکیب‌کننده‌ی ویرگول (Comma)",
    helpTitle: "انتخابگرها را با ویرگول (,) با هم ترکیب کنید!",
    syntax : "A, B",
    help : 'همه‌ی عنصرهای <strong>A</strong> و <strong>B</strong> را انتخاب می‌کند، با این روش می‌توانید هر انتخابگری را با انتخابگرهای دیگر ترکیب کنید، حتّی می‌توان بیشتر از ۲ انتخابگر را با یکدیگر ترکیب کرد.',
    examples: [
    '<strong>p, .fun</strong> همه‌ی عناصر <tag>p</tag> و همچنین هرعنصری با <strong>class="fun"</strong> را انتخاب می‌کند',
    '<strong>a, p, div</strong> همه‌ی عناصر <tag>a</tag>، <tag>p</tag> و <tag>div</tag> را انتخاب می‌کند'
    ],
    board: "pP(P)[P](P)Pp"
  },
  {
    doThis : "همه را انتخاب کن!",
    selector : "*",
    selectorName:  "انتخابگر سراسری (Universal Selector)",
    helpTitle: "می‌توانید همه‌چیز را انتخاب کنید",
    syntax : "*",
    help : 'با انتخابگر سراسری می‌توانید همه‌ی عنصرها را انتخاب کنید',
    examples : [
      '<strong>p *</strong> تمام عناصر داخل یک عنصر <strong>&lt;p&gt;</strong> را انتخاب می‌کند.'
    ],
    board: "A(o)[][O]{)"
  },
  {
    doThis : "هرچیزی را که درون بشقاب‌هاست انتخاب کن",
    selector : "plate *",
    syntax : "A&nbsp;&nbsp;*",
    helpTitle: "ترکیب انتخابگر سراسری",
    help : 'تمام عنصرهای داخل <strong>A</strong> را انتخاب می‌کند.',
    examples : [
      '<strong>p *</strong> تمام عناصر درون همه‌ی <strong>&lt;p&gt;</strong>ها را انتخاب می‌کند.',
      '<strong>ul.fancy *</strong> هر عنصری را که داخل عناصر <strong>&lt;ul class="fancy"&gt;</strong> باشد انتخاب می‌کند.'
    ],
    board: "{o}(P)a(A)"
  },
  {
    doThis : "سیب‌هایی را که بعد از بشقاب‌ها هستند انتخاب کن",
    selector : "plate + apple",
    helpTitle: "انتخاب عنصری که دقیقا بعد از عنصر دیگر آمده",
    selectorName: "انتخابگر همزاد مجاور (Adjacent Sibling)",
    syntax : "A + B",
    help : "همه‌ی عنصرهای <strong>B</strong> که دقیقا بعد از هر عنصر <strong>A</strong> آمده باشند را انتخاب می‌کند. به عنصرهایی که پشت سر هم نوشته شوند همزاد (Sibling) می‌گوییم. این عنصرها در یک سطح یا عمق قرار دارند.<br><br>در کدهای HTML این مرحله، عناصری که فاصله‌ی آن‌ها از سمت چپ نمایشگر HTML یکسان باشد با یکدیگر همزاد هستند.",
    examples : [
      '<strong>p + .intro</strong> همه‌ی عنصرهایی که دارای <strong>class="intro"</strong> هستند و دقیقا بعد از یک عنصر <tag>p</tag> بیایند انتخاب می‌کند',
      '<strong>div + a</strong> هر عنصر <tag>a</tag> را که دقیقا پشت سر یک <tag>div</tag> آمده باشد انتخاب می‌کند'
    ],
    board: "[a]()a()Aaa"
  },
  {
    selectorName: "انتخابگر همزاد عمومی (General Sibling)",
    helpTitle: "انتخاب عناصری که بعد از عنصر دیگری آمده‌اند",
    syntax: "A ~ B",
    doThis : "هر خیارشوری که سمت راست بنتو است انتخاب کن",
    selector : "bento ~ pickle",
    help : "می‌توان همه‌ی همزادهای یک عنصر را که بعد از آن آمده باشند انتخاب کرد. این یکی هم مثل همان انتخابگر همزاد مجاور (A + B) عمل می‌کند با این تفاوت که همه‌ی عناصر بعدی را انتخاب می‌کند، نه فقط اوّلین آن‌ها را.",
    examples : [
      '<strong>A ~ B</strong> همه‌ی <strong>B</strong>هایی را که بعد از یک <strong>A</strong> آمده باشند انتخاب می‌کند.'
    ],
    board: "P[o]pP(P)(p)"
  },
  {
    selectorName: "انتخابگر فرزند (Child)",
    syntax: "A > B&nbsp;",
    doThis : "سیبی را که مستقیماً درون بشقاب است انتخاب کن",
    selector : "plate > apple",
    helpTitle: "انتخاب فرزندان مستقیم یک عنصر",
    help : "می‌توان همه‌ی عنصرهایی که فرزند بی‌واسطه‌ی عنصر دیگری هستند را انتخاب کرد. عنصر فرزند به عنصری گفته می‌شود که مستقیماً داخل یک عنصر دیگر قرار داشته باشد.<br><br>عنصرهایی که با یک یا چند واسطه داخل عنصر دیگری باشند از نسل آن عنصر محسوب می‌شوند و با انتخابگر نسل قابل انتخاب هستند.",
    examples : [
      '<strong>A > B</strong> همه‌ی <strong>B</strong>هایی را که فرزند مستقیم یک <strong>A</strong> باشند انتخاب می‌کند'
    ],
    board: "([A])(A)()Aa"
  },
  {
    selectorName: "شِبه انتخابگر اوّلین فرزند",
    helpTitle: "انتخاب اولین عنصری که داخل یک عنصر دیگر قرار دارد (اوّلین فرزند آن)",
    doThis : "پرتقال بالایی را انتخاب کن",
    selector : "plate :first-child",
    syntax: ":first-child",

    help : "شما می‌توانید اوّلین عنصر فرزند را انتخاب کنید. عنصر فرزند به عنصری گفته می‌شود که مستقیماً داخل یک عنصر دیگر قرار داشته باشد. شما می‌توانید این شِـبْـهِ انتخابگر را به صورت ترکیبی با سایر انتخابگرها به کار ببرید.",
    examples : [
      '<strong>:first-child</strong> اوّلین فرزند تمام عناصر را انتخاب می‌کند.',
      '<strong>p:first-child</strong> اوّلین فرزند تمام عنصرهای <tag>p</tag> را انتخاب می‌کند.',
      '<strong>div p:first-child</strong> اوّلین فرزند همه‌ی <strong>&lt;p&gt;</strong>هایی را که درون یک <strong>&lt;div&gt;</strong> قرار داشته باشند انتخاب می‌کند.'
    ],
    board: "[]()(OOO)p"
  },
  {
    selectorName: "شبه انتخابگر تنها فرزند",
    helpTitle: "انتخاب عنصرهایی که تنها فرزند عنصر دیگری هستند",
    doThis : "سیب و خیارشور درون بشقاب‌ها را انتخاب کن",
    selector : "plate :only-child",
    syntax: ":only-child",
    help : "می‌توانید هر عنصری که تنها عنصر درون یکی دیگر باشد را انتخاب کنید.",
    examples : [
      '<strong>span:only-child</strong> هر عنصر <strong>&lt;span&gt;</strong> را که تنها عنصر درون هر چیز دیگری باشند انتخاب می‌کند.',
//      '<strong>span:only-child</strong> selects the <strong>&lt;span&gt;</strong> elements that are the only child of some other element.',
      '<strong>ul li:only-child</strong> تنها عنصر <strong>&lt;li&gt;</strong>ـی که درون یک <strong>&lt;ul&gt;</strong> باشد را انتخاب می‌کند.'
//      '<strong>ul li:only-child</strong> selects the only <strong>&lt;li&gt;</strong> element that are in a <strong>&lt;ul&gt;</strong>.'
    ],
    board: "(A)(p)[]P(oO)p"
  },
  {
    selectorName: "Last Child Pseudo-selector",
    helpTitle: "Select the last element inside of another element",
    doThis : "Select the small apple and the pickle",
    selector : ".small:last-child",
    syntax: ":last-child",
    help : "You can use this selector to select an element that is the last child element inside of another element. <br><br>Pro Tip &rarr; In cases where there is only one element, that element counts as the first-child, only-child and last-child!",
    examples : [
      '<strong>:last-child</strong> selects all last-child elements.',
      '<strong>span:last-child</strong> selects all last-child <strong>&lt;span&gt;</strong> elements.',
      '<strong>ul li:last-child</strong> selects the last <strong>&lt;li&gt;</strong> elements inside of any <strong>&lt;ul&gt;</strong>.'
    ],
    board: "{a)()(oO)p"
  },
  {
    selectorName: "Nth Child Pseudo-selector",
    helpTitle: "Select an element by its order in another element",
    doThis : "Select the 3rd plate",
    selector : ":nth-child(3)",
    syntax: ":nth-child(A)",

    help : "Selects the <strong>nth</strong> (Ex: 1st, 3rd, 12th etc.) child element in another element.",
    examples : [
      '<strong>:nth-child(8)</strong> selects every element that is the 8th child of another element.',
      '<strong>div p:nth-child(2)</strong> selects the second <strong>p</strong> in every <strong>div</strong>',
    ],
    board: "()()(){}"
  },
  {
    selectorName: "Nth Last Child Selector",
    helpTitle: "Select an element by its order in another element, counting from the back",
    doThis : "Select the 1st bento",
    selector : "bento:nth-last-child(4)",
    syntax: ":nth-last-child(A)",
    help : "Selects the children from the bottom of the parent. This is like nth-child, but counting from the back!",
    examples : [
      '<strong>:nth-last-child(2)</strong> selects all second-to-last child elements.'
    ],
    board: "()[]a(OOO)[]"
  },
  {
    selectorName: "First of Type Selector",
    helpTitle: "Select the first element of a specific type",
    doThis : "Select first apple",
    selector : "apple:first-of-type",
    syntax: ":first-of-type",
    help : "Selects the first element of that type within another element.",
    examples : [
      '<strong>span:first-of-type</strong> selects the first <strong>&lt;span&gt;</strong> in any element.'
    ],
    board: "Aaaa(oO)"
  },
  {
    selectorName: "Nth of Type Selector",
    // helpTitle: "Nth of Type Selector",
    doThis: "Select all even plates",
    selector: "plate:nth-of-type(even)",
    syntax: ":nth-of-type(A)",
    help: "Selects a specific element based on its type and order in another element - or even or odd instances of that element.",
    examples: [
      '<strong>div:nth-of-type(2)</strong> selects the second instance of a div.',
      '<strong>.example:nth-of-type(odd)</strong> selects all odd instances of a the example class.'
    ],
    board: "()()()(){}()"
  },
  {
    selectorName: "Nth-of-type Selector with Formula",
    // helpTitle: "Nth-of-type Selector with formula",
    doThis: "Select every 2nd plate, starting from the 3rd",
    selector: "plate:nth-of-type(2n+3)",
    syntax: ":nth-of-type(An+B)",
    help: "The nth-of-type formula selects every nth element, starting the count at a specific instance of that element.",
    examples: [
      '<strong>span:nth-of-type(6n+2)</strong> selects every 6th instance of a <tag>span</tag>, starting from (and including) the second instance.'
    ],
    board: "()(p)(a)()(A)()"
  },

  {
    selectorName: "Only of Type Selector",
    helpTitle: "Select elements that are the only ones of their type",
    selector : "apple:only-of-type",
    syntax: ":only-of-type",
    doThis : "Select the apple on the middle plate.",
    help : "Selects the only element of its type within another element.",
    examples : [
      '<strong>p span:only-of-type</strong> selects a <tag>span</tag> within any <tag>p</tag> if it is the only <tag>span</tag> in there.'
    ],
    board: "(aA)(a)(p)"
  },

  {
    selectorName: "Last of Type Selector",
    helpTitle: "Select the last element of a specific type",
    doThis : "Select the second apple and orange",
    selector : ".small:last-of-type",
    syntax: ":last-of-type",
    help : "Selects each last element of that type within another element. Remember type refers the kind of tag, so <tag>p</tag> and <tag>span</tag> are different types. <br><br> I wonder if this is how the last dinosaur was selected before it went extinct.",
    examples : [
      '<strong>div:last-of-type</strong> selects the last <strong>&lt;div&gt;</strong> in every element.',
      '<strong>p span:last-of-type</strong> selects the last <strong>&lt;span&gt;</strong> in every <strong>&lt;p&gt;</strong>.'
    ],
    board: "ooPPaa"
  },
  {
    selectorName: "Empty Selector",
    helpTitle: "Select elements that don't have children",
    doThis : "Select the empty bentos",
    selector : "bento:empty",
    syntax: ":empty",
    help : "Selects elements that don't have any other elements inside of them.",
    examples : [
      '<strong>div:empty</strong> selects all empty <strong>&lt;div&gt;</strong> elements.'
    ],
    board: "[][p][][]"
  },
  {
    selectorName: "Negation Pseudo-class",
    helpTitle: "Select all elements that don't match the negation selector",

    doThis : "Select the big apples",
    selector : "apple:not(.small)",
    syntax: ":not(X)",
    help : 'You can use this to select all elements that do not match selector <strong>"X"</strong>.',
    examples : [
      '<strong>:not(#fancy)</strong> selects all elements that do not have <strong>id="fancy"</strong>.',
      '<strong>div:not(:first-child)</strong> selects every <tag>div</tag> that is not a first child.',
      '<strong>:not(.big, .medium)</strong> selects all elements that do not have <strong>class="big"</strong> or <strong>class="medium"</strong>.'
    ],
    board: "{a}(A)A(o)p"
  }
];

// Generate <bdi> tags
levels.forEach(function (level) {
  for (var i in level.examples) {
    level.examples[i] = generateBdi(level.examples[i])
  }
  level.help = generateBdi(level.help)

  function generateBdi(text) {
    return text
      .replace(/(<strong>|<tag>)/g, function (tag) {return '<bdi>' + tag})
      .replace(/(<\/strong>|<\/tag>)/g, function (tag) {return tag + '</bdi>'})
  }
})
