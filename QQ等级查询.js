import plugin from '../../lib/plugins/plugin.js';
//作者：知鱼
//博客：http://ocoa.cn
//QQ群：861646887
//GitHub：https://github.com/ovoox
export class YiYanPlugin extends plugin {
  constructor() {
    super({
      name: 'QQ信息',
      dsc: '查询QQ信息',
      event: 'message',
      priority: 500,
      rule: [
        {
          reg: /^#?QQ信息\s*(\d+)?$/,
          fnc: 'Grade'
        }
      ]
    });
  }

 
  async Grade(e) {
    const match = e.msg.match(/^#?QQ信息\s*(\d+)?$/); 
    const qqNumber = match[1];

    if (!qqNumber) {
      await e.reply('请在后面输入任意QQ号');
      return;
    }

    try {
      const response = await fetch(`http://jiuli.xiaoapi.cn/i/qq/qq_level.php?qq=${qqNumber}`);
      const data = await response.json(); 
      if (data && data.code === 200) {
        const replyMessage = `QQ:${data.qq}
QID: ${data.qid}
昵称: ${data.name}
头像最后修改: ${data.sFaceTime}
等级: ${data.level}
等级图标: ${data.icon}
加速倍数: ${data.Accelerate}
成长值: ${data.iGrowthValue}
成长速度/天: ${data.iGrowthSpeed}
是否VIP: ${data.iVip}
是否SVIP: ${data.iSVip}
VIP等级: ${data.iVipLevel}
活跃时长(天): ${data.iTotalActiveDay}
下个等级需要天数: ${data.iNextLevelDay}
VIP到期时间: ${data.sVipExpireTime}
SVIP到期时间: ${data.sSVipExpireTime}
年费到期时间: ${data.sYearExpireTime}
是否大会员: ${data.XVip}
是否年费大会员: ${data.NXVip}
大会员等级: ${data.XVipLevel}
大会员成长值: ${data.XVipGrowth}
大会员成长速度/天: ${data.XVipSpeed}
昨天是否在线满1.0天: ${data.iYesterdayLogin}
今天是否在线满1.0天: ${data.iTodayLogin}
今日电脑QQ在线时长: ${data.iPCQQOnlineTime}
今日已加速*天: ${data.iRealDays}
今日最多加速*天: ${data.iMaxLvlRealDays}
注册时间: ${data.RegistrationTime}
注册时长: ${data.RegTimeLength}
IP属地(仅供参考): ${data.ip_city}`;

        await e.reply(replyMessage);
      } else {
        await e.reply('无法获取QQ信息 请重试');
      }
    } catch (err) {
      logger.error(`[QQ信息] 查询失败: ${err.message}`);
      await e.reply('发生错误 请重试');
    }
  }
}