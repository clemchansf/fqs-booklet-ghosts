import React from 'react';

const quiz_1 = {
    titleText: {
      zh: `第一章`,
      cn: `第一章`,
      en: `Chapter One`
    },
    questions: [
          {
            headerText: {
               zh: `為什麼有時人是個滿懷鬼胎，比鬼可怕?`,
               cn: `为什么有时人是个满怀鬼胎，比鬼可怕?`,
               en: `Why sometimes people are full of ghost behaviors, more terrible than ghosts?`
            },
            choices: [
              {
                check: false,
                labelText: {
                  zh: `因為人以誠懇、信任、坦率、真實的心來幫助人`,
                  cn: `因为人以诚恳、信任、坦率、真实的心来帮助人`,
                  en: `Because people use sincerity, trust, honesty, and true heart to help people`
                }
              },
              {
                check: true,
                labelText: {
                  zh: `因為人所回報的卻是欺騙、無義、諂曲、自私的態度`,
                  cn: `因为人所回报的却是欺骗、无义、谄曲、自私的态度`,
                  en: `Because what people returned are deception, senselessness, flattery, and selfish attitude`,
                }
              }
            ],
            hintText: {
              zh: `可不可怕,是由行為決定啊!`,
              cn: `可不可怕,是由行为决定啊!`,
              en: `Oh, whether terrible or not is determined by behavior!`
            }
          },
          {
            headerText: {
              zh: `為什麼鬼給老和尚嚇跑了?`,
              cn: `为什么鬼给老和尚吓跑了?`,
              en: `Why were the ghosts scared away by the old monk?`
            },
            choices: [
              {
                check: false,
                labelText: {
                  zh: `正在盤腿打坐`,
                  cn: `正在盘腿打坐`,
                  en: `Is sitting cross-legged in mediation posture`
                }
              },
              {
                check: true,
                labelText: {
                  zh: `鬼已經用盡所有嚇人的技倆`,
                  cn: `鬼已经用尽所有吓人的技俩`,
                  en: `The ghosts have exhausted all scary tactics`
                }
              },
              {
                check: true,
                labelText: {
                  zh: `仁者無敵，在慈悲之前，一切的邪惡力量將遁匿無形`,
                  cn: `仁者无敌，在慈悲之前，一切的邪恶力量将遁匿无形`,
                  en: `Benevolent invincible, before compassion, all evil forces will have no invisible mean to escape`,
                }
              }
            ],
            hintText: {
              zh: `心量大就能容納別人啊!`,
              cn: `心量大就能容纳别人啊!`,
              en: `Oh, big heart can accommodate others!`
            }
          }
      ]
}

const quiz_2 =
{
    titleText: {
      zh: `第二章`,
      cn: `第二章`,
      en: `Chapter Two`
    },
    questions: [
      {
        headerText: {
          zh: `多財鬼，少財鬼，無財鬼，出自那一古德的著作?`,
          cn: `多财鬼，少财鬼，无财鬼，出自那一古德的著作?,.`,
          en: `More wealth ghosts, little wealth ghosts, no wealth ghosts, from which Abhidharma commentary?`
        },
        choices: [
          {
            check: true,
            labelText: {
              zh: `阿毘達磨順正理論`,
              cn: `阿毗达磨顺正理论`,
              en: `Nyāyānusāriṇī`
            }
          },
          {
              check: false,
              labelText: {
                zh: `大毘婆沙論`,
                cn: `大毗婆沙论`,
                en: `Abhidharma Mahāvibhāṣā Śāstra`
              }
          }
        ],
        hintText: {
          zh: `要不要回去再翻翻看?`,
          cn: `要不要回去再翻翻看?`,
          en: `Do you want to go back and look again?`
        }
      },
      {
        headerText: {
          zh: `見到人家拿著好的東西時，搓著雙手是甚麼?`,
          cn: `见到人家拿着好的东西时，搓着双手是什么?`,
          en: `See people holding something good, rubbing his hands is what?`
        },
        choices: [
          {
            check: false,
            labelText: {
                zh: '是正人君子',
                cn: `是正人君子`,
                en: `Is a gentleman`
            }
          },
          {
            check: false,
            labelText: {
                zh: '是個虛榮鬼',
                cn: `是个虚荣鬼`,
                en: `Is a vanity ghost`
            }
          },
          {
            check: false,
            labelText: {
                zh: '是個好色鬼',
                cn: `是个好色鬼`,
                en: `Is a lustful ghost`
              }
          },
          {
            check: false,
            labelText: {
                zh: '是貪心鬼',
                cn: `是贪心鬼`,
                en: `Is a greedy ghost`
              }
          },
          {
            check: true,
            labelText: {
               zh: '是個占便宜鬼',
               cn: `是个占便宜鬼`,
               en: `is a ghost that like to take advantages from others`
             }
           }
        ],
        hintText: {
          zh: `眾生多想不勞而獲!`,
          cn: `众生多想不劳而获!`,
          en: `Sentient beings always want to gain without giving up much effort!`
        }
      }
    ]
}

const quiz_3 =
{
    titleText: {
      zh: `第三章` ,
      cn: `第三章`,
      en: `Chapter Three`
     },
    questions: [
      {
        headerText: {
          zh: `苦鬼常常感到饑腸轆轆、乾渴難忍，這時要用?` ,
          cn: `苦鬼常常感到饥肠辘辘、干渴难忍，这时要用?`,
          en: `Bitter ghosts often feel hungry, thirsty, then use?`
        },
        choices: [
          {
            check: false,
            labelText: {
              zh: `甘美的食物祭拜他` ,
              cn: `甘美的食物祭拜他`,
              en: `Sweet food to worship him`
            }
          },
          {
            check: true,
            labelText: {
              zh: `辦簡單的素果菜茗，以佛門的誦經持咒，神力加持去其咽喉火焰`,
              cn: `办简单的素果菜茗，以佛门的诵经持咒，神力加持去其咽喉火焰`,
              en: `Do simple fruit and vegetable, use Buddhist chanting mantra's blessing power to get rid of the flame in its throat` }
          },
          {
            check: false,
            labelText: {
              zh: `殺生，三牲齊備` ,
              cn: `杀生，三牲齐备`,
              en: `Killing, three kinds of animals are available`
            }
          }
        ],
        hintText: {
          zh: `苦鬼的業力執著比人更大,很難超脫苦果!` ,
          cn: `苦鬼的业力执着比人更大,很难超脱苦果!`,
          en: `The karma of the bitterly ghosts are more persistent than people, it is difficult to get rid of fruitions of bitterness!` }
      },

      {
        headerText: {
          zh: `我們要紀念祖先，應?` ,
          cn: `我们要纪念祖先，应?`,
          en: `We want to commemorate our ancestors, shall we be?`
        },
        choices: [
          {
            check: false,
            labelText: {
              zh: `買一堆金銀紙，把可貴的金錢付之火炬` ,
              cn: `买一堆金银纸，把可贵的金钱付之火炬`,
              en: `To torch the valuable money by, buying a pile of gold and silver paper effigies`
            }
          },
          {
            check: true,
            labelText: {
              zh: `可以用祖先的名義設立獎學金，作育天下英才` ,
              cn: `可以用祖先的名义设立奖学金，作育天下英才`,
              en: `You can use the name of the ancestors to set up scholarships, educate the world of excellence`
            }
          },
          {
            check: true,
            labelText: {
              zh: `捐獻給社會公益事業，興學辦校，印行善書，讓祖先能夠真正的遺愛人間，留芳萬世。` ,
              cn: `捐献给社会公益事业，兴学办校，印行善书，让祖先能够真正的遗爱人间，留芳万世。`,
              en: `Donated to the social welfare undertakings, florish and set up school, printed books, so that ancestors can really leave their love to the world, and their fragrant stay in the world for tens of milleniums.`
            }
          },
          {
            check: false,
            labelText: {
              zh: `所有以上的答案` ,
              cn: `所有以上的答案`,
              en: `All of the above`
            }
          }
        ],
        hintText: {
          zh: `利益大眾比較利益自己的福德較大!` ,
          cn: `利益大众比较利益自己的福德较大!`,
          en: `The blessed merit to benefit the public is bigger than their own!`
        }
      }
    ]
}

const quiz_4 =
{

    titleText: {
      zh: `第四章` ,
      cn: `第四章`,
      en: `Chaptor Four` },
    questions: [
      {
        headerText: {
          zh: `超度人間鬼怪的法門就是讓他們?` ,
          cn: `超度人间鬼怪的法门就是让他们?`,
          en: `Transcendent deliver the humanic ghost of the world is to let them?` },
        choices: [
          {
            check: false,
            labelText: {
              zh: `吞雲吐霧` ,
              cn: `吞云吐雾`,
              en: `Smoking nacotics and drugs`
            }
          },
          {
            check: false,
            labelText: {
              zh: `每天喝得醉眼醺醺的` ,
              cn: `每天喝得醉眼醺醺的`,
              en: `get drunk drinking every day`
            }
          },
          {
            check: false,
            labelText: {
              zh: `賭得天昏地暗` ,
              cn: `赌得天昏地暗`,
              en: `Gambling day and night`
            }
          },
          {
            check: false,
            labelText: {
              zh: `戀眷朱顏女色，耽溺不知自拔` ,
              cn: `恋眷朱颜女色，耽溺不知自拔`,
              en: `dwell in beautify physical form, become uncontrollably addictive`
            }
          },
          {
            check: true,
            labelText: {
              zh: `佛教的三皈、五戒、六度、十善` ,
              cn: `佛教的三皈、五戒、六度、十善`,
              en: `Buddhism's three refuges, five precepts, six measures, and ten virtuous deeds`
            }
          }
        ],
        hintText: {
          zh: `善惡有別!` ,
          cn: `善恶有别!`,
          en: `There is difference between evil and virtuous deeds!`
        }
      }
    ]
}

module.exports = {
  quizess: [
    null,   // cover page
    null,   // author page
    null,
    quiz_1,
    quiz_2,
    quiz_3,
    quiz_4
  ]
};
