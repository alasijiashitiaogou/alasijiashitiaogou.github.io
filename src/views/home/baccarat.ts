/**
 * 计算百家乐手牌点数
 * @param {Array<string>} hand - 手牌，例如 [\'A\', \'K\', \'5\']
 * @returns {number} - 手牌点数
 */
export function calculateHandValue(hand: any[]) {
  let value = 0;
  for (let card of hand) {
    if (['K', 'Q', 'J', '10'].includes(card)) {
      value += 0;
    } else if (card === 'A') {
      value += 1;
    } else {
      const parsedCard = parseInt(card);
      if (isNaN(parsedCard) || parsedCard < 1 || parsedCard > 9) {
        throw new Error(
          `无效的牌面: ${card}. 牌面必须是 A, K, Q, J, 10-2 或数字 1-9。`
        );
      }
      value += parsedCard;
    }
  }
  return value % 10;
}

/**
 * 根据庄家和闲家手牌决定胜者
 * @param {Array<string>} bankerHand - 庄家手牌
 * @param {Array<string>} playerHand - 闲家手牌
 * @returns {string} - 胜者 (\'庄家\', \'闲家\', \'和局\')
 */
function determineWinner(bankerHand: any[], playerHand: any[]) {
  const bankerValue = calculateHandValue(bankerHand);
  const playerValue = calculateHandValue(playerHand);

  if (bankerValue === playerValue) {
    return '和局';
  } else if (bankerValue > playerValue) {
    return '庄家';
  } else {
    return '闲家';
  }
}

/**
 * 模拟百家乐游戏并计算结果
 * @param {Array<string>} dealtCards - 已发牌的顺序，例如 [\'A\', \'K\', \'5\', \'3\', \'J\', \'8\']
 * @returns {Object} - 游戏结果，包含庄家手牌、闲家手牌、胜者、以及本局使用的牌数
 */
export function simulateBaccarat(dealtCards: string | any[]) {
  let playerHand = [];
  let bankerHand = [];
  let cardIndex = 0;

  const getNextCard = () => {
    if (cardIndex >= dealtCards.length) {
      throw new Error('牌数不足以完成本局游戏。');
    }
    return dealtCards[cardIndex++];
  };

  try {
    // 发前两张牌给闲家和庄家
    playerHand.push(getNextCard());
    bankerHand.push(getNextCard());
    playerHand.push(getNextCard());
    bankerHand.push(getNextCard());
  } catch (error) {
    throw new Error('牌数不足，无法开始游戏。每局至少需要4张牌。');
  }

  // 检查是否为天牌 (Natural)
  const playerInitialValue = calculateHandValue(playerHand);
  const bankerInitialValue = calculateHandValue(bankerHand);

  if (playerInitialValue >= 8 || bankerInitialValue >= 8) {
    return {
      playerHand: playerHand,
      bankerHand: bankerHand,
      winner: determineWinner(bankerHand, playerHand),
      cardsUsed: cardIndex
    };
  }

  let playerDrawsThirdCard = false;
  // 闲家补牌规则
  if (playerInitialValue <= 5) {
    try {
      playerHand.push(getNextCard());
      playerDrawsThirdCard = true;
    } catch (error) {
      throw new Error('牌数不足，闲家无法补牌。');
    }
  }

  const playerThirdCardValue = playerDrawsThirdCard
    ? calculateHandValue([playerHand[2]])
    : -1; // 闲家没有第三张牌时为-1
  const bankerCurrentValue = calculateHandValue(bankerHand);

  // 庄家补牌规则
  if (!playerDrawsThirdCard) {
    // 闲家没有补牌
    if (bankerCurrentValue <= 5) {
      try {
        bankerHand.push(getNextCard());
      } catch (error) {
        throw new Error('牌数不足，庄家无法补牌。');
      }
    }
  } else {
    // 闲家补牌了
    if (bankerCurrentValue <= 2) {
      try {
        bankerHand.push(getNextCard());
      } catch (error) {
        throw new Error('牌数不足，庄家无法补牌。');
      }
    } else if (bankerCurrentValue === 3 && playerThirdCardValue !== 8) {
      try {
        bankerHand.push(getNextCard());
      } catch (error) {
        throw new Error('牌数不足，庄家无法补牌。');
      }
    } else if (
      bankerCurrentValue === 4 &&
      [2, 3, 4, 5, 6, 7].includes(playerThirdCardValue)
    ) {
      try {
        bankerHand.push(getNextCard());
      } catch (error) {
        throw new Error('牌数不足，庄家无法补牌。');
      }
    } else if (
      bankerCurrentValue === 5 &&
      [4, 5, 6, 7].includes(playerThirdCardValue)
    ) {
      try {
        bankerHand.push(getNextCard());
      } catch (error) {
        throw new Error('牌数不足，庄家无法补牌。');
      }
    } else if (
      bankerCurrentValue === 6 &&
      [6, 7].includes(playerThirdCardValue)
    ) {
      try {
        bankerHand.push(getNextCard());
      } catch (error) {
        throw new Error('牌数不足，庄家无法补牌。');
      }
    }
  }

  return {
    playerHand: playerHand,
    bankerHand: bankerHand,
    winner: determineWinner(bankerHand, playerHand),
    cardsUsed: cardIndex
  };
}
