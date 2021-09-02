export const adminMenuList = [
    {
        title: '首页',
        icon: 'HomeOutlined',
        to: '/home/adminHome'
    },
    {
        title: '用户管理',
        icon: 'UserOutlined',
        to: '/home/userManagement'
    },
    {
        title: '投票管理',
        icon: 'ShoppingOutlined',
        to:'',
        children: [
            {
                title:'投票列表',
                icon: 'ShoppingOutlined',
                to: '/home/adminVoteList',
            },
            {
                title: '新增投票',
                icon: 'ShoppingOutlined',
                to: '/home/addVote',
            },
            {
                title:'投票结果',
                icon: 'ShoppingOutlined',
                to: '/home/voteResult',
            }
        ]
    },
    {
        title: '信息采集管理',
        icon: 'ShopOutlined',
        to:'',
        children: [
            {
                title:'采集表列表',
                icon: 'ShoppingOutlined',
                to: '/home/infoList',
            },
            {
                title: '新增采集表',
                icon: 'ShoppingOutlined',
                to: '/home/addInfo',
            },
            {
                title:'采集结果',
                icon: 'ShoppingOutlined',
                to: '/home/infoResult',
            }
        ]
    },
    {
        title: '留言管理',
        icon: 'ShopOutlined',
        to:'/home/message'
    }
]

export const userMenuList = [
    {title:'首页',
    icon: 'ShopOutlined',
    to:'/home/userHome'
},
    {
        title:'个人信息',
        icon: 'ShopOutlined',
        to:'/home/personalInfo'
    },
    {
        title:'投票',
        icon: 'ShopOutlined',
        to:'',
        children:[{
            title:'投票列表',
            icon: 'ShopOutlined',
            to:'/home/userVoteList'
        },
        {
            title:'投票结果',
            icon: 'ShopOutlined',
            to:'/home/voteResult'
        }]
    },
    {
        title:'信息采集',
        icon: 'ShopOutlined',
        to:'',
        children:[{
            title:'问卷列表',
            icon: 'ShopOutlined',
            to:'/home/personalInfo'
        },
        {
            title:'采集结果',
            icon: 'ShopOutlined',
            to:'/home/personalInfo'
        }]
    },
    {
        title:'收藏',
        icon: 'ShopOutlined',
        to:'/home/collect',
    },
    {
        title:'已参与',
        icon: 'ShopOutlined',
        to:'/home/join',
    },
    {
        title:'留言',
        icon: 'ShopOutlined',
        to:'/home/advice',
    },
]

