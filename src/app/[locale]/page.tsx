import './page.css';

export default function Home() {
  return (
      <main className="landingPage">
          <div className="wepLogo">
            Nocode/WEP
          </div>

          <button className="priviteBtn quick">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <a className="text" href="http://wep.turntip.cn/home">立即体验</a>
          </button>

          <button className="priviteBtn">
            <span className="circle1"></span>
            <span className="circle2"></span>
            <span className="circle3"></span>
            <span className="circle4"></span>
            <span className="circle5"></span>
            <a className="text" href="http://wep.turntip.cn/private">私有化部署</a>
          </button>

          <div className="slogan">
            <div className="typewriter">
                <div className="slide"><i></i></div>
                <div className="paper"></div>
                <div className="keyboard"></div>
            </div>
            <div>下一代全场景可视化办公解决方案</div>
          </div>

          <div className="feature">
            <div className="notification">
              <div className="notiglow"></div>
              <div className="notiborderglow"></div>
              <div className="notititle">AI + 文档引擎</div>
              <div className="notibody">底层基于零代码引擎设计的一套文档搭建 + 交互模式，借助AI让文档创作更高效</div>
            </div>

            <div className="notification">
              <div className="notiglow"></div>
              <div className="notiborderglow"></div>
              <div className="notititle">Nextjs 内核</div>
              <div className="notibody">基于Next.js打造，提供出色的首屏加载性能，高度可定制，提供优秀的用户体验，适用于大型项目</div>
            </div>

            <div className="notification">
              <div className="notiglow"></div>
              <div className="notiborderglow"></div>
              <div className="notititle">零代码可视化最佳实践</div>
              <div className="notibody">多年零代码实践经验，1W+真实用户的体验反馈，提供极致的应用搭建体验</div>
            </div>

            <div className="notification">
              <div className="notiglow"></div>
              <div className="notiborderglow"></div>
              <div className="notititle">系统安全性和稳定性</div>
              <div className="notibody">通过加密技术保证用户的数据安全，采用PM2保证系统稳定性，负载均衡，以及弹性扩展</div>
            </div>
          </div>

          <div className="demo">
            <img src="https://cdn.dooring.cn/wep.gif" alt="Nocode/WEP 智能可视化文档编辑器" />
          </div>

          <div className="module-title">
            海量Web组件，覆盖更多内容场景
          </div>

          <div className="module-content">
            <div className="card">
              <h2>思维导图</h2>
            </div>
            <div className="card">
              <h2>可视化图表</h2>
            </div>
            <div className="card">
              <h2>表单制作</h2>
            </div>
            <div className="card">
              <h2>创意白板</h2>
            </div>
            <div className="card">
              <h2>流程图</h2>
            </div>
            <div className="card">
              <h2>图文音视频</h2>
            </div>
            <div className="card">
              <h2>Web容器</h2>
            </div>
            <div className="card">
              <h2>业务信息流</h2>
            </div>
            <div className="card">
              <h2>代码编辑器</h2>
            </div>
            <div className="card">
              <h2>......</h2>
            </div>
          </div>

          <div className="module-title">
            特色场景案例
          </div>

          <div className="module-content fuildWrap">
            <div className="cardImg">
              <img src="https://cdn.dooring.cn/FlQJxRYRJx2sMeIuKw76IOJCH-Wp" alt="流程图编辑器 - drawio" />
            </div>
            <div className="cardImg">
              <img src="https://cdn.dooring.cn/Flpu2lB2-XQghamF6kDBqMsUzM65" alt="可视化白板工具" />
            </div>
            <div className="cardImg">
              <img src="https://cdn.dooring.cn/FpSCq3pN5AonJpRGbiAPxdYqreeN" alt="可视化白板工具" />
            </div>
            <div className="cardImg">
              <img src="https://cdn.dooring.cn/FgIzNE5vqLi1Nloxm3Nv7VuqmBJl" alt="可视化白板工具" />
            </div>
          </div>

          <div className="module-title">
            行业之声
          </div>

          <div className="module-content review">
            <div className="card2">
              <div className="content">
                <p className="heading">野林 - 阿里云专家博主
                </p><p className="para">
                Nocode/WEP是一款“AI+文档”的零代码产品，也是多种交叉方向下的新型技术探索实践。在当下火热的AI大模型进程中，Nocode/WEP直击文档领域的产品使用痛点，通过融合AI提示、协同编辑等功能特性，提升了文档编辑效率与知识沉淀能力，其对AIGC领域的商业化落地也具有标杆作用！
                </p>
                <button className="btn">央企前端架构师</button>
              </div>
            </div>
            <div className="card2">
              <div className="content">
                <p className="heading">朱昆鹏 - AI领域创业者
                </p><p className="para">
                Nocode/WEP零代码的可视化设计 + AI功能，让文档编辑变的简单高效！对于自媒体博主或者企业，使用它做内部知识管理将会带来非常有意思的变革。
                </p>
                <button className="btn">北京龙腾比特科技有限责任公司 CEO</button>
              </div>
            </div>
            <div className="card2">
              <div className="content">
                <p className="heading">伊婷 - 高级IE工程师
                </p><p className="para">
                  传统制造企业往往需要更定制化的内容载体，Nocode/WEP的文档编辑器恰到好处的解决了制造业文档资产呈现的问题，从流程图到Web容器，可以支持更丰富的内容载体，非常不错的一款产品。
                </p>
                <button className="btn">三星集团越南工厂项目经理</button>
              </div>
            </div>
            <div className="card2">
              <div className="content">
                <p className="heading">坚果 - 鸿蒙生态专家
                </p><p className="para">
                Nocode/WEP文档产品真的非常出色，具有简便性与易用性，功能丰富，操作便捷，可以轻松高效处理各类文档事务，值得推荐。
                </p>
                <button className="btn">江苏润开鸿数字科技有限公司</button>
              </div>
            </div>
            <div className="card2">
              <div className="content">
                <p className="heading">陈随易 - 独立开发者
                </p><p className="para">
                WEP的表现力太丰富了！表单、公式、白板、思维导图、弹幕、网页等等，都可以通过简单的鼠标点击融合到一个文档中，从未见过如此创新的设计。
                </p>
                <button className="btn">随易科技CEO</button>
              </div>
            </div>
            <div className="card2">
              <div className="content">
                <p className="heading">Vam - Strve框架作者
                </p><p className="para">
                所见即所得，释放了无限的创造力。而 AI 功能的融入更是如虎添翼，它像是智慧的引擎，为整个设计过程注入了智能与高效。是一款非常 Nice 的产品！
                </p>
                <button className="btn">资深前端工程师</button>
              </div>
            </div>
          </div>



          <div className="footerBtnGroup">
            <a className="codepen-button" href={'/home'}><span>立即体验</span></a>
            <a href="/resource" className="exBtn">入门案例</a>
          </div>
          <footer className="footer" style={{color: "rgb(201, 205, 212)"}}>
            ©版权所有 ：重庆橙讯智科网络科技有限公司 
            <div className="icp">
              <img src="https://turntip.cn/cxzk/static/image/beian.png" alt="" />
              <a href="https://beian.miit.gov.cn/" style={{color: "rgb(201, 205, 212)"}}>
                 渝ICP备2023006249号-1
              </a>
            </div>
          </footer>
      </main>
  );
}
