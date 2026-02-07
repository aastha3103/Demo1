import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Easing, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GAME_DATA_TRANSLATIONS } from '../constants/gameTranslations';
import { Language, TRANSLATIONS } from '../constants/translations';
import { useRewards } from '../context/RewardContext';
import { useUser } from '../context/UserContext';
import { BOARD_DATA } from '../game/board';
import { CARD_CONFIG, CardAction } from '../game/CardConfig';
import { Tile as TileType } from '../game/types';
import { Tile } from './Tile';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dynamic Board Reflow Logic - Optimized for Portrait Inward Growth
// Ensuring the board size is strictly constrained by both width and height to prevent panel overlap
const MAX_BOARD_VAL = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT * 0.55);
const BOARD_SIZE = Math.floor(MAX_BOARD_VAL - 10);
const TILE_THICKNESS = Math.floor(BOARD_SIZE * 0.14);
const INNER_TILE_LENGTH = Math.floor((BOARD_SIZE - 2 * TILE_THICKNESS) / 9);
const BOARD_VERTICAL_OFFSET = 20; // Safe space for score panels

type MiniGameType = 'GENERIC' | 'UPI' | 'KYC' | 'QUIZ' | 'PHISHING' | 'PLAN_SELECT' | 'TAPPER' | 'VIDEO' | 'SLIDER' | 'MARKET_ROLL' | 'DRAG_DROP' | 'PIN_ATM' | 'CHANCE' | 'COMMUNITY' | 'INPUT_FIELD';

interface PlayerState {
    id: number;
    name: string;
    pos: number;
    money: number;
    color: string;
    stats: {
        knowledge: number;
        creditScore: number;
        experience: number;
        hasInsurance: boolean;
    };
    bankMoney: number;
    salaryModifier: number;
    inventory: string[];
    badges: string[];
    buffs: string[];
    recurringExpenses: { id: string, amount: number }[];
    loans: { source: 'shark' | 'bank' | 'emergency', principal: number, rate: number, turns: number }[];
    socialCapital: number;
    investmentFund: number;
    rdActive: boolean;
    accumulatedSavings: number;
    inflationIndex: number;
    shgMember: boolean;
    roundCount: number;
    flags: Record<string, boolean>;
    isBot: boolean;
    botDifficultyLevel?: number; // 0: Easy, 1: Medium, 2: Hard
    isOut: boolean;
    hearts: number;
}

export default function Board() {
    const { completeTask } = useRewards();
    const [rollCount, setRollCount] = useState(0);
    const [language, setLanguage] = useState<Language>('en');
    const t = (section: string, key: string, params?: Record<string, string | number>) => {
        let text = TRANSLATIONS[language][section]?.[key] || key;
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text.replace(`{${k}}`, v.toString());
            });
        }
        return text;
    };
    const getTileName = (id: number) => GAME_DATA_TRANSLATIONS[language].tiles[id] || BOARD_DATA[id].name;

    const getLocalizedCardData = (id: number) => {
        const base = CARD_CONFIG[id];
        const localized = GAME_DATA_TRANSLATIONS[language].cards?.[id];
        if (!localized) return base;

        return {
            ...base,
            title: localized.title,
            story: localized.story,
            choices: base.choices.map((c, i) => ({
                ...c,
                label: localized.choices[i] || c.label,
                ui_feedback: localized.feedback[i] || c.ui_feedback
            }))
        };
    };

    // Multiplayer State
    const [players, setPlayers] = useState<PlayerState[]>([]);
    const [turn, setTurn] = useState(0);
    const activePlayer = players[turn] || null;

    const [dice, setDice] = useState([1, 1]);
    const [isRolling, setIsRolling] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const [showCard, setShowCard] = useState(false);
    const [currentTile, setCurrentTile] = useState<TileType>(BOARD_DATA[0]);

    const [setupStep, setSetupStep] = useState(0); // 0: Lang, 1: Players, 2: Names, 3: Playing
    const [totalPlayers, setTotalPlayers] = useState(2);
    const [humanCount, setHumanCount] = useState(2);
    const [botCount, setBotCount] = useState(0);
    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [botDifficulty, setBotDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('MEDIUM');
    const { user } = useUser();

    // Reset player names when profile changes
    useEffect(() => {
        if (user && playerNames.length === 0) {
            setPlayerNames([user.name, 'Player 2', 'Player 3', 'Player 4']);
        }
    }, [user]);

    // Mini-Game State
    const [miniGameType, setMiniGameType] = useState<MiniGameType>('GENERIC');
    const [miniGameInput, setMiniGameInput] = useState("");
    const [tapCount, setTapCount] = useState(0);
    const [progress, setProgress] = useState(0);
    const [showLoanSelection, setShowLoanSelection] = useState(false);
    const [pendingLoanAmount, setPendingLoanAmount] = useState(0);
    const [isBotThinking, setIsBotThinking] = useState(false);
    const [isTaskMinimized, setIsTaskMinimized] = useState(false);
    const [hasRolled, setHasRolled] = useState(false);
    const [isDecisionMaking, setIsDecisionMaking] = useState(false);
    const [botActionInProgress, setBotActionInProgress] = useState(false);
    const [botProgress, setBotProgress] = useState(0);
    const [botTaskStatus, setBotTaskStatus] = useState<string | null>(null);
    const [botSelectedIndex, setBotSelectedIndex] = useState<number | null>(null);
    const [currentCardFeedback, setCurrentCardFeedback] = useState<string | null>(null);

    // Animations
    const cardAnim = useRef(new Animated.Value(0)).current;
    const diceAnim = useRef(new Animated.Value(0)).current;
    const diceScale = useRef(new Animated.Value(1)).current;
    const diceRotate = useRef(new Animated.Value(0)).current;

    const playerAnims = useRef<{ [key: number]: Animated.ValueXY }>({}).current;
    const playerScales = useRef<{ [key: number]: Animated.Value }>({}).current;
    const isTurnEnding = useRef(false);

    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const speak = (text: string) => {
        if (!text) return;
        Speech.stop();

        // Clean text for TTS: Remove currency symbols and extra punctuation
        let cleanText = text
            .replace(/₹/g, ' rupees ')
            .replace(/-/g, ' minus ')
            .replace(/[!?.।]/g, ' ')
            .trim();

        const localeMap: Record<Language, string> = {
            en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', bn: 'bn-IN',
            te: 'te-IN', ta: 'ta-IN', gu: 'gu-IN', kn: 'kn-IN',
            ml: 'ml-IN', or: 'or-IN', pa: 'pa-IN', as: 'as-IN',
            mai: 'hi-IN', bho: 'hi-IN', har: 'hi-IN', sat: 'hi-IN'
        };

        // Small delay to ensure stop() finishes
        setTimeout(() => {
            Speech.speak(cleanText, {
                pitch: 1.0,
                rate: 1.0,
                language: localeMap[language] || 'en-IN'
            });
        }, 50);
    };

    const getPlayerCoordinates = (pos: number) => {
        const edgeSpace = BOARD_SIZE - 2 * TILE_THICKNESS;
        // Monopoly standard orientation: 0 (BR), 10 (BL), 20 (TL), 30 (TR)
        if (pos === 0) return { left: BOARD_SIZE - TILE_THICKNESS, top: BOARD_SIZE - TILE_THICKNESS };

        if (pos < 10) { // Side 1: Bottom (R -> L)
            const s = Math.floor(((pos - 1) * edgeSpace) / 9);
            const e = Math.floor((pos * edgeSpace) / 9);
            const mid = TILE_THICKNESS + (edgeSpace - (s + e) / 2);
            return { left: mid - 9, top: BOARD_SIZE - TILE_THICKNESS + 5 };
        }
        if (pos === 10) return { left: 0, top: BOARD_SIZE - TILE_THICKNESS };

        if (pos < 20) { // Side 2: Left (B -> T)
            const s = Math.floor(((pos - 11) * edgeSpace) / 9);
            const e = Math.floor(((pos - 10) * edgeSpace) / 9);
            const mid = TILE_THICKNESS + (edgeSpace - (s + e) / 2);
            return { left: 5, top: mid - 9 };
        }
        if (pos === 20) return { left: 0, top: 0 };

        if (pos < 30) { // Side 3: Top (L -> R)
            const s = Math.floor(((pos - 21) * edgeSpace) / 9);
            const e = Math.floor(((pos - 20) * edgeSpace) / 9);
            const mid = TILE_THICKNESS + (s + e) / 2;
            return { left: mid - 9, top: 5 };
        }
        if (pos === 30) return { left: BOARD_SIZE - TILE_THICKNESS, top: 0 };

        // Side 4: Right (T -> B)
        const s = Math.floor(((pos - 31) * edgeSpace) / 9);
        const e = Math.floor(((pos - 30) * edgeSpace) / 9);
        const mid = TILE_THICKNESS + (s + e) / 2;
        return { left: BOARD_SIZE - TILE_THICKNESS + 5, top: mid - 9 };
    };

    const handleRollDice = () => {
        if (isRolling || isMoving || hasRolled || activePlayer?.isOut || showCard) return;

        const newCount = rollCount + 1;
        setRollCount(newCount);
        if (newCount >= 5) {
            completeTask('econ_roll');
        }

        setIsRolling(true);
        setHasRolled(true);
        speak(t('ui', 'rolling'));

        Animated.parallel([
            Animated.timing(diceAnim, { toValue: 1, duration: 800, easing: Easing.linear, useNativeDriver: true }),
            Animated.sequence([
                Animated.timing(diceScale, { toValue: 1.5, duration: 400, useNativeDriver: true }),
                Animated.timing(diceScale, { toValue: 1, duration: 400, useNativeDriver: true })
            ]),
            Animated.timing(diceRotate, { toValue: 8, duration: 800, useNativeDriver: true })
        ]).start(() => {
            diceAnim.setValue(0);
            diceRotate.setValue(0);
            finishRoll();
        });
    };

    const finishRoll = async () => {
        const d1 = Math.floor(Math.random() * 6) + 1;
        const d2 = Math.floor(Math.random() * 6) + 1;
        const total = d1 + d2;
        setDice([d1, d2]);
        const startPos = activePlayer.pos;
        const endPos = (startPos + total) % 40;

        setIsRolling(false);
        setIsMoving(true);
        speak(t('ui', 'moving', { total }));

        for (let i = 1; i <= total; i++) {
            const stepPos = (startPos + i) % 40;
            const coords = getPlayerCoordinates(stepPos);
            // Calculate quadrant offset (2x2 grid) for multi-player visibility
            const offX = (activePlayer.id % 2 === 0) ? 4 : TILE_THICKNESS * 0.45;
            const offY = (activePlayer.id < 2) ? 4 : TILE_THICKNESS * 0.45;

            Animated.parallel([
                Animated.timing(playerAnims[activePlayer.id], {
                    toValue: { x: coords.left + offX, y: coords.top + offY },
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.sequence([
                    Animated.timing(playerScales[activePlayer.id], { toValue: 1.5, duration: 150, useNativeDriver: true }),
                    Animated.timing(playerScales[activePlayer.id], { toValue: 1.0, duration: 150, useNativeDriver: true }),
                ])
            ]).start();

            await new Promise(r => setTimeout(r, 320));
            setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, pos: stepPos } : p));
            setFocusedIndex(stepPos);

            if (stepPos === 0) {
                setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, money: p.money + 500 } : p));
                speak(t('ui', 'passedGo'));
            }
        }

        setIsMoving(false);
        const tile = BOARD_DATA[endPos];
        setCurrentTile(tile);
        determineMiniGame(tile);
        speak(`${t('ui', 'landedOn')} ${getTileName(endPos)}`);

        cardAnim.setValue(0);
        Animated.spring(cardAnim, { toValue: 1, friction: 5, tension: 40, useNativeDriver: true }).start();

        setTimeout(() => {
            setShowCard(true);
            setIsTaskMinimized(false);
            const localizedCard = getLocalizedCardData(endPos);
            speak(localizedCard.story);
        }, 500);
    };

    const determineMiniGame = (tile: TileType) => {
        setMiniGameInput("");
        setTapCount(0);
        setProgress(0);
        const id = tile.id;
        if (tile.type === 'CHANCE' && id !== 36) { setMiniGameType('CHANCE'); return; }
        if (tile.type === 'COMMUNITY' && id !== 17) { setMiniGameType('COMMUNITY'); return; }
        if (id === 1 || id === 17) setMiniGameType('KYC');
        else if (id === 9 || id === 16) setMiniGameType('PHISHING');
        else if (id === 13) setMiniGameType('TAPPER');
        else if (id === 5 || id === 25 || id === 27 || id === 35 || id === 38) setMiniGameType('QUIZ');
        else if (id === 6) setMiniGameType('UPI');
        else if (id === 36) setMiniGameType('MARKET_ROLL');
        else if (id === 32) setMiniGameType('PIN_ATM');
        else setMiniGameType('GENERIC');
    };

    const updateStats = (money: number, know: number, credit: number, exp: number, msg: string, insurance = false, bank = 0, deductHeart = false) => {
        setPlayers(prev => {
            const currentP = prev[turn];
            if (!currentP) return prev;

            let newMoney = currentP.money + money;
            let newBank = currentP.bankMoney + bank;
            const newKnow = (currentP.stats?.knowledge || 0) + know;
            let newHearts = currentP.hearts;

            if (deductHeart) {
                newHearts -= 1;
                newMoney -= 500;
                speak(t('ui', 'wrongAnswer'));
            }

            const updatedPlayers = prev.map((p, idx) => idx === turn ? {
                ...p,
                money: newMoney,
                bankMoney: newBank,
                hearts: newHearts,
                stats: {
                    ...p.stats,
                    knowledge: newKnow,
                    creditScore: (p.stats?.creditScore || 650) + credit,
                    experience: (p.stats?.experience || 0) + exp,
                    hasInsurance: insurance || p.stats?.hasInsurance || false
                }
            } : p);

            if (newKnow >= 500 || (newMoney + newBank) >= 100000) {
                speak(t('ui', 'win', { name: currentP.name }));
                Alert.alert("🏆 VICTORY 🏆", `${currentP.name} has won!`);
                return updatedPlayers;
            }

            if (newHearts <= 0) {
                updatedPlayers[turn].isOut = true;
                speak(t('ui', 'out', { name: currentP.name }));
                Alert.alert("💔 GAME OVER 💔", `${currentP.name} has no hearts left and must retire.`, [{
                    text: "Exit", onPress: () => {
                        setPlayers(updatedPlayers);
                        endTurn();
                    }
                }]);
                return updatedPlayers;
            }

            if (newMoney + newBank <= 0) {
                speak(t('ui', 'broke'));
                Alert.alert("⚠️ BROKE ⚠️", "Your balance is zero. You must take a loan to continue in Econopolis.", [
                    {
                        text: "Ask for Loan", onPress: () => {
                            setPlayers(updatedPlayers);
                            setShowLoanSelection(true);
                        }
                    }
                ]);
                return updatedPlayers;
            }

            if (currentP.isBot) {
                speak(msg || t('ui', 'turnComplete'));
                setTimeout(() => endTurn(), 2000);
            } else {
                speak(msg);
                Alert.alert(t('ui', 'result') || "Result", msg, [{ text: t('ui', 'done') || "Done", onPress: () => endTurn() }]);
            }

            return updatedPlayers;
        });
    };

    const endTurn = () => {
        if (isTurnEnding.current) return;
        isTurnEnding.current = true;

        setBotProgress(0);
        setBotTaskStatus(null);
        setPlayers(prev => prev.map(p => ({
            ...p,
            loans: p.loans.map(l => ({ ...l, turns: l.turns - 1 })).filter(l => l.turns > 0)
        })));

        setShowCard(false);
        setCurrentCardFeedback(null);
        setIsTaskMinimized(false);
        setHasRolled(false);
        setIsDecisionMaking(false);
        setBotActionInProgress(false);
        setIsBotThinking(false);
        setMiniGameType('GENERIC');

        // Delay the turn change slightly to allow Modal fade-out to finish
        // This prevents the "next" player's data from appearing in the closing card
        setTimeout(() => {
            const activeRemaining = players.filter(p => !p.isOut);
            if (activeRemaining.length <= 1 && players.length > 1) {
                const winner = activeRemaining[0] || players[0];
                speak(t('ui', 'gameOver', { name: winner.name }));
                Alert.alert("🏁 GAME OVER 🏁", `${winner.name} has survived ECONOPOLIS and won by default!`);
                return;
            }

            setTurn(prev => {
                let next = (prev + 1) % players.length;
                let firstNext = next;
                while (players[next].isOut) {
                    next = (next + 1) % players.length;
                    if (next === firstNext) break;
                }
                return next;
            });
            setFocusedIndex(null);
            setShowLoanSelection(false);
            isTurnEnding.current = false;
        }, 300);
    };

    const handleTakeLoan = (lender: string) => {
        const isEmergency = activePlayer.money + activePlayer.bankMoney <= 0;
        const amount = isEmergency ? 10000 : 5000;
        const rate = lender === 'SHARK' ? 0.50 : lender === 'NGO' ? 0.15 : 0.10;
        const turns = lender === 'SHARK' ? 2 : lender === 'NGO' ? 4 : 6;

        setPlayers(prev => prev.map((p, idx) => idx === turn ? {
            ...p,
            money: p.money + amount,
            loans: [...p.loans, { source: lender === 'SHARK' ? 'shark' : lender === 'NGO' ? 'emergency' : 'bank', principal: amount, rate, turns }]
        } : p));

        setShowLoanSelection(false);
        speak(t('ui', 'loanSuccess', { amount, lender }));
        Alert.alert("Loan Received", `₹${amount} added to your wallet. Remember to pay it back!`, [{ text: "Okay", onPress: () => endTurn() }]);
    };

    const handleCardAction = (action: CardAction) => {
        // Complete 'Wise Decision' task
        completeTask('econ_decision');

        const id = action.action_id;
        let m = 0, b = 0, k = 0, c = 0, e = 5;
        let newInv: string[] = [];
        let newBadges: string[] = [];
        let newBuffs: string[] = [];
        let newExp: { id: string, amount: number }[] = [];
        let newSalary = 0;
        let newFlags: Record<string, boolean> = {};
        let finalFeedback = action.ui_feedback;

        switch (id) {
            case 'take_cash': m = 5000; break;
            case 'take_bank':
                const stipendBank = 5000 + (activePlayer.salaryModifier || 0) + 100;
                if (activePlayer.rdActive) {
                    b = stipendBank - 500;
                    setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, accumulatedSavings: p.accumulatedSavings + 500 } : p));
                } else { b = stipendBank; }
                k = 10;
                break;
            case 'kyc_success': k = 20; e = 10; newFlags['kyc_verified'] = true; break;
            case 'ignore_kyc':
            case 'ignore_kyc_fail': m = 0; break;
            case 'stash_home': m = 2000; newFlags['risk_high'] = true; break;
            case 'stash_bank': b = 2000; k = 10; break;
            case 'apply_inflation':
            case 'pay_inflation_penalty': m = 0; break;
            case 'buy_emi': m = -500; newInv = ['Phone']; newFlags['emi_active'] = true; break;
            case 'buy_cash': m = -6000; newInv = ['Phone']; break;
            case 'pay_repair': m = -500; break;
            case 'repair_fail':
            case 'jail_argue':
            case 'ignore_asset_fail':
            case 'rest_fail':
            case 'reject_internship_fail':
            case 'skip_video_fail': m = 0; break;
            case 'trigger_quiz': setMiniGameType('QUIZ'); return;
            case 'validate_pin':
                if (miniGameInput === "123456" || miniGameInput === "000000") {
                    updateStats(-500, 0, -20, 0, t('ui', 'weakPin'), false, 0, true);
                    return;
                } else {
                    updateStats(0, 20, 10, 5, t('ui', 'strongPin'));
                    return;
                }
            case 'lend_money': m = -500; newFlags['raju_loan'] = true; break;
            case 'decline_lend': k = 5; break;
            case 'pay_service': m = -200; break;
            case 'click_scam': b = -1000; c = -50; break;
            case 'avoid_scam': k = 10; e = 10; break;
            case 'visit_jail': break;
            case 'enroll_skill': m = -3000; newSalary = 1000; break;
            case 'sub_basic': newExp = [{ id: 'recharge', amount: 300 }]; break;
            case 'sub_premium': newExp = [{ id: 'recharge', amount: 800 }]; break;
            case 'gig_payout': m = 1500; break;
            case 'buy_asset_laptop': m = -5000; newInv = ['Harvester']; break;
            case 'pay_commute': m = -300; break;
            case 'trigger_quiz_commute': setMiniGameType('QUIZ'); return;
            case 'pay_scam_agent': m = -2000; break;
            case 'report_scam': k = 10; break;
            case 'claim_grant':
                if (activePlayer.flags['kyc_verified']) { m = 2000; finalFeedback = "Approved! ₹2000 Credited."; }
                else { m = 0; finalFeedback = "Rejected. You never linked your Aadhaar/PAN."; }
                break;
            case 'accept_internship': m = 500; newBadges = ['Dairy Apprentice']; break;
            case 'check_asset_hustle':
                if (activePlayer.inventory.includes('Harvester')) { m = 1500; finalFeedback = "You used your Harvester! Earned ₹1500."; }
                else { m = 200; finalFeedback = "You had no tools. Earned only ₹200."; }
                break;
            case 'watch_video_shield': newBuffs = ['Credit Shield']; break;
            case 'skip_video': break;
            case 'take_shark_loan':
                m = 5000; c = -20;
                setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, loans: [...p.loans, { source: 'shark', principal: 5000, rate: 0.50, turns: 10 }] } : p));
                break;
            case 'check_emergency_fund':
                if (activePlayer.shgMember || activePlayer.stats.hasInsurance) { m = 0; finalFeedback = "Safety Net covered it!"; }
                else { m = -5000; }
                break;
            case 'apply_bank_loan':
                if (activePlayer.stats.creditScore > 700) {
                    b = 5000;
                    setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, loans: [...p.loans, { source: 'bank', principal: 5000, rate: 0.10, turns: 10 }] } : p));
                } else { finalFeedback = "Loan Rejected."; }
                break;
            case 'buy_insurance': m = -500; setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, stats: { ...p.stats, hasInsurance: true } } : p)); break;
            case 'pay_inflation': m = -800; break;
            case 'trigger_quiz_fuel': setMiniGameType('QUIZ'); return;
            case 'pledge_gold': m = 3000; break;
            case 'calc_credit_score':
                let newScore = 650 + (activePlayer.stats.experience * 10);
                setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, stats: { ...p.stats, creditScore: newScore } } : p));
                finalFeedback = `CIBIL Score: ${newScore}`;
                break;
            case 'pay_utility': m = -400; break;
            case 'gift_expensive': m = -3000; break;
            case 'gift_cheap': m = -500; break;
            case 'pay_debt_penalty': m = -1000; break;
            case 'apply_inflation': m = -500; break;
            case 'start_rd': setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, rdActive: true } : p)); break;
            case 'invest_windfall': m = -5000; break;
            case 'keep_windfall': m = 5000; break;
            case 'buy_house_check': break;
            case 'pay_travel': m = -1500; break;
            case 'trigger_quiz_travel': setMiniGameType('QUIZ'); return;
            case 'market_fluctuation': m = 500; break;
            case 'join_shg': m = -1000; setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, shgMember: true } : p)); break;
            case 'pay_tax': m = -1000; break;
            case 'trigger_quiz_tax': setMiniGameType('QUIZ'); return;
            case 'calc_net_worth': break;
            case 'reset_round':
                setPlayers(prev => prev.map((p, idx) => idx === turn ? { ...p, roundCount: p.roundCount + 1, inflationIndex: p.inflationIndex + 0.1, pos: 0 } : p));
                break;
            default: handleGenericAction(action.label); return;
        }

        setPlayers(prev => prev.map((p, idx) => idx === turn ? {
            ...p,
            inventory: [...p.inventory, ...newInv],
            badges: [...p.badges, ...newBadges],
            buffs: [...p.buffs, ...newBuffs],
            recurringExpenses: [...p.recurringExpenses, ...newExp],
            salaryModifier: p.salaryModifier + newSalary,
            flags: { ...p.flags, ...newFlags }
        } : p));

        setCurrentCardFeedback(finalFeedback);
        updateStats(m, k, c, e, finalFeedback, false, b, action.isWrong);
    };

    const handleGenericAction = (actionStr: string) => {
        let m = 0, k = 0, c = 0, e = 0;
        const extract = (s: string) => {
            const x = s.match(/₹(\d+)(k)?/i);
            if (!x) return 0;
            let val = parseInt(x[1]);
            if (x[2]) val *= 1000;
            return val;
        };
        const p = extract(actionStr);
        if (actionStr.includes("Pay") || actionStr.includes("Buy") || actionStr.includes("Invest")) m = -p;
        else if (actionStr.includes("Collect") || actionStr.includes("Gain") || actionStr.includes("Receive")) m = p;
        updateStats(m, k, c, e, `Action: ${actionStr}`);
    };

    const renderGeneric = () => {
        const config = getLocalizedCardData(currentTile.id);
        if (currentCardFeedback) {
            return (
                <View style={styles.actionContainer}>
                    <View style={{ alignItems: 'center', padding: 20 }}>
                        <MaterialCommunityIcons name="check-circle" size={50} color="#22c55e" />
                        <Text style={[styles.modalDescription, { marginTop: 15, fontSize: 16, fontWeight: 'bold', color: '#fff' }]}>
                            {currentCardFeedback}
                        </Text>
                        <TouchableOpacity
                            style={[styles.actionButton, { marginTop: 20, width: '100%' }]}
                            onPress={() => endTurn()}
                        >
                            <Text style={styles.actionButtonText}>{t('ui', 'close')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        if (config) {
            return (
                <View style={styles.actionContainer}>
                    <Text style={styles.modalDescription}>{config.story}</Text>
                    {config.choices.map((choice, idx) => (
                        <TouchableOpacity
                            key={idx}
                            style={[
                                styles.actionButton,
                                idx === 0 ? { backgroundColor: '#3b82f6' } : { backgroundColor: '#1e293b', marginTop: 12 },
                                activePlayer?.isBot && botSelectedIndex === idx && styles.botHoverGlow
                            ]}
                            onPress={() => handleCardAction(choice)}
                        >
                            <Text style={styles.actionButtonText}>
                                {choice.label}
                                {activePlayer?.isBot && botSelectedIndex === idx && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            );
        }
        return (
            <View style={styles.actionContainer}>
                <Text style={styles.modalDescription}>{currentTile.description || "Pass through the village safely."}</Text>
                <TouchableOpacity style={styles.actionButton} onPress={() => endTurn()}>
                    <Text style={styles.actionButtonText}>{t('ui', 'done')}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderLoanSelection = () => (
        <View style={styles.miniGameContainer}>
            <Text style={styles.gameTitle}>{t('miniGames', 'lenderTitle')}</Text>
            <TouchableOpacity
                style={[styles.loanOption, { borderColor: '#3b82f6' }, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                onPress={() => handleTakeLoan('MICRO')}
            >
                <Text style={styles.loanLender}>
                    {t('miniGames', 'micro')} {activePlayer?.isBot && botSelectedIndex === 0 && ` (${t('ui', 'choosing')})`}
                </Text>
                <MaterialCommunityIcons name="bank" size={24} color="#3b82f6" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.loanOption, { borderColor: '#10b981', marginTop: 12 }, activePlayer?.isBot && botSelectedIndex === 1 && styles.botHoverGlow]}
                onPress={() => handleTakeLoan('NGO')}
            >
                <Text style={styles.loanLender}>
                    {t('miniGames', 'ngo')} {activePlayer?.isBot && botSelectedIndex === 1 && ` (${t('ui', 'choosing')})`}
                </Text>
                <MaterialCommunityIcons name="hand-heart" size={24} color="#10b981" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.loanOption, { borderColor: '#ef4444', marginTop: 12 }, activePlayer?.isBot && botSelectedIndex === 2 && styles.botHoverGlow]}
                onPress={() => handleTakeLoan('SHARK')}
            >
                <Text style={styles.loanLender}>
                    {t('miniGames', 'shark')} {activePlayer?.isBot && botSelectedIndex === 2 && ` (${t('ui', 'choosing')})`}
                </Text>
                <MaterialCommunityIcons name="skull-crossbones" size={24} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 20 }} onPress={() => setShowLoanSelection(false)}>
                <Text style={{ color: '#94a3b8' }}>{t('ui', 'close')}</Text>
            </TouchableOpacity>
        </View>
    );

    const renderMiniGame = () => {
        const config = getLocalizedCardData(currentTile.id);
        const storyText = config?.story || "Complete the task to proceed!";

        switch (miniGameType) {
            case 'KYC':
                return (
                    <View style={styles.miniGameContainer}>
                        <Text style={styles.gameTitle}>{t('miniGames', 'kyc')}</Text>
                        <Text style={[styles.modalDescription, { marginBottom: 15 }]}>{storyText}</Text>
                        <TouchableOpacity
                            style={[styles.actionButton, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                            onPress={() => {
                                if (currentTile.id === 17) updateStats(2000, 20, 0, 10, t('ui', 'kycFull'));
                                else updateStats(0, 20, 0, 5, t('ui', 'kycBasic'));
                            }}
                        >
                            <Text style={styles.actionButtonText}>
                                {t('miniGames', 'scanID')} {activePlayer?.isBot && botSelectedIndex === 0 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'UPI':
                return (
                    <View style={styles.miniGameContainer}>
                        <Text style={styles.gameTitle}>{t('miniGames', 'upi')}</Text>
                        <Text style={[styles.modalDescription, { marginBottom: 15 }]}>{storyText}</Text>
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: '#ef4444' }, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                            onPress={() => updateStats(-500, 0, -20, 0, t('ui', 'upiFail'), false, 0, true)}
                        >
                            <Text style={styles.actionButtonText}>
                                {t('miniGames', 'easyPIN')} {activePlayer?.isBot && botSelectedIndex === 0 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, { marginTop: 10, backgroundColor: '#10b981' }, activePlayer?.isBot && botSelectedIndex === 1 && styles.botHoverGlow]}
                            onPress={() => updateStats(0, 20, 10, 5, t('ui', 'upiSuccess'))}
                        >
                            <Text style={styles.actionButtonText}>
                                {t('miniGames', 'strongPIN')} {activePlayer?.isBot && botSelectedIndex === 1 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'PHISHING':
                return (
                    <View style={styles.miniGameContainer}>
                        <Text style={[styles.gameTitle, { color: '#ef4444' }]}>{t('miniGames', 'phishing')}</Text>
                        <Text style={[styles.modalDescription, { marginBottom: 15 }]}>{storyText}</Text>
                        <TouchableOpacity
                            style={[styles.actionButton, { backgroundColor: '#ef4444' }, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                            onPress={() => updateStats(-1000, 0, -50, 0, t('ui', 'phishingFail'), false, 0, true)}
                        >
                            <Text style={styles.actionButtonText}>
                                {t('miniGames', 'clickScan')} {activePlayer?.isBot && botSelectedIndex === 0 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, { marginTop: 10, backgroundColor: '#10b981' }, activePlayer?.isBot && botSelectedIndex === 1 && styles.botHoverGlow]}
                            onPress={() => updateStats(0, 30, 0, 10, t('ui', 'phishingSuccess'))}
                        >
                            <Text style={styles.actionButtonText}>
                                {t('miniGames', 'blockScam')} {activePlayer?.isBot && botSelectedIndex === 1 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'QUIZ':
                const questions = [
                    { q: "What is the best way to save for a daughter's wedding?", a: "Post Office Sukanya Samriddhi", b: "Keep cash in a box", correct: 'a' },
                    { q: "What does 'CIBIL Score' mean?", a: "Your age in bank books", b: "Your credit reputation", correct: 'b' },
                    { q: "Kisan Credit Card gives loans at...", a: "Low Interest", b: "High Interest", correct: 'a' }
                ];
                const qIdx = currentTile.id % questions.length;
                const q = questions[qIdx];
                return (
                    <View style={styles.miniGameContainer}>
                        <Text style={styles.gameTitle}>{t('miniGames', 'quiz')}</Text>
                        <Text style={[styles.modalDescription, { marginBottom: 15 }]}>{storyText}</Text>
                        <Text style={[styles.modalDescription, { color: '#fff', fontSize: 16, marginBottom: 10 }]}>{q.q}</Text>
                        <TouchableOpacity
                            style={[styles.actionButton, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                            onPress={() => {
                                if (q.correct === 'a') updateStats(500, 10, 0, 5, t('ui', 'quizCorrect'));
                                else updateStats(-200, 0, 0, 0, t('ui', 'quizWrong'), false, 0, true);
                            }}
                        >
                            <Text style={styles.actionButtonText}>
                                {q.a} {activePlayer?.isBot && botSelectedIndex === 0 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, { marginTop: 10 }, activePlayer?.isBot && botSelectedIndex === 1 && styles.botHoverGlow]}
                            onPress={() => {
                                if (q.correct === 'b') updateStats(500, 10, 0, 5, t('ui', 'quizCorrect'));
                                else updateStats(-200, 0, 0, 0, t('ui', 'quizWrong'), false, 0, true);
                            }}
                        >
                            <Text style={styles.actionButtonText}>
                                {q.b} {activePlayer?.isBot && botSelectedIndex === 1 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'TAPPER':
                return (
                    <View style={styles.miniGameContainer}>
                        <Text style={styles.gameTitle}>{t('miniGames', 'tapper')}</Text>
                        <Text style={styles.modalDescription}>Tap fast to move the harvest! ({tapCount}/10)</Text>
                        <View style={styles.botProgressBarBase}>
                            <View style={[styles.botProgressBarFill, { width: `${(tapCount / 10) * 100}%`, backgroundColor: '#10b981' }]} />
                        </View>
                        <TouchableOpacity
                            style={[styles.actionButton, { marginTop: 20 }, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                            onPress={() => {
                                if (tapCount >= 9) updateStats(1500, 10, 0, 5, t('ui', 'tapperSuccess'));
                                else setTapCount(prev => prev + 1);
                            }}
                        >
                            <Text style={styles.actionButtonText}>
                                {t('miniGames', 'push')} {activePlayer?.isBot && botSelectedIndex === 0 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'PIN_ATM':
                return (
                    <View style={styles.miniGameContainer}>
                        <Text style={styles.gameTitle}>{t('miniGames', 'pinAtm')}</Text>
                        <Text style={styles.modalDescription}>Confirm your Post Office RD PIN.</Text>
                        <TouchableOpacity
                            style={[styles.actionButton, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                            onPress={() => updateStats(0, 10, 0, 5, t('ui', 'atmSuccess'))}
                        >
                            <Text style={styles.actionButtonText}>
                                {t('miniGames', 'confirmPIN')} {activePlayer?.isBot && botSelectedIndex === 0 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'MARKET_ROLL':
                return (
                    <View style={styles.miniGameContainer}>
                        <Text style={styles.gameTitle}>{t('miniGames', 'marketRisk')}</Text>
                        <Text style={styles.modalDescription}>Roll the dice to see if grain prices went up!</Text>
                        <TouchableOpacity
                            style={[styles.actionButton, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                            onPress={() => updateStats(500, 0, 0, 5, t('ui', 'marketSuccess'))}
                        >
                            <Text style={styles.actionButtonText}>
                                {t('miniGames', 'rollDice')} {activePlayer?.isBot && botSelectedIndex === 0 && ` (${t('ui', 'choosing')})`}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            case 'INPUT_FIELD':
                return (
                    <View style={styles.miniGameContainer}>
                        <Text style={styles.gameTitle}>{getTileName(currentTile.id)}</Text>
                        <Text style={styles.modalDescription}>Enter safe PIN (not 1234 or 0000)</Text>
                        <TouchableOpacity
                            style={[styles.actionButton, activePlayer?.isBot && botSelectedIndex === 0 && styles.botHoverGlow]}
                            onPress={() => handleCardAction({ label: "Submit", action_id: "validate_pin", ui_feedback: "Validating..." })}
                        >
                            <Text style={styles.actionButtonText}>
                                Submit 1739 {activePlayer?.isBot && botSelectedIndex === 0 && " (Choosing...)"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            default: return renderGeneric();
        }
    };

    const renderSetup = () => {
        if (setupStep === 0) {
            const langs: { id: Language, name: string, emoji: string }[] = [
                { id: 'en', name: 'English', emoji: '🇬🇧' },
                { id: 'hi', name: 'हिन्दी', emoji: '🇮🇳' },
                { id: 'mr', name: 'मराठी', emoji: '🏛️' },
                { id: 'bn', name: 'বাংলা', emoji: '🌸' },
                { id: 'te', name: 'తెలుగు', emoji: '🌺' },
                { id: 'ta', name: 'தமிழ்', emoji: '🏯' },
                { id: 'gu', name: 'ગુજરાતી', emoji: '🦁' },
                { id: 'kn', name: 'ಕನ್ನಡ', emoji: '🐘' },
                { id: 'ml', name: 'മലയാളം', emoji: '🥥' },
                { id: 'or', name: 'ଓଡ଼ିଆ', emoji: '🛕' },
                { id: 'pa', name: 'ਪੰਜਾਬੀ', emoji: '🌾' },
                { id: 'as', name: 'অসমীয়া', emoji: '🍵' },
                { id: 'mai', name: 'मैथिली', emoji: '🎭' },
                { id: 'bho', name: 'भोजपुरी', emoji: '🎪' },
                { id: 'har', name: 'हरियाणवी', emoji: '🌻' },
                { id: 'sat', name: 'संताली', emoji: '🌲' }
            ];
            return (
                <View style={styles.setupContainerGreen}>
                    <View style={styles.setupHeaderGreen}>
                        <Text style={styles.setupIconGreen}>🏛️</Text>
                        <Text style={styles.setupTitleGreen}>Econopolis</Text>
                        <Text style={styles.setupSubheadingGreen}>Choose Your Language / अपनी भाषा चुनें</Text>
                    </View>
                    <ScrollView style={{ width: '100%', maxHeight: 400 }} showsVerticalScrollIndicator={false}>
                        <View style={{ gap: 12, paddingBottom: 20 }}>
                            {langs.map(l => (
                                <TouchableOpacity
                                    key={l.id}
                                    style={[
                                        styles.setupOptionGreen,
                                        language === l.id && styles.setupOptionActiveGreen,
                                    ]}
                                    onPress={() => { setLanguage(l.id); setSetupStep(1); }}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.setupOptionEmoji}>{l.emoji}</Text>
                                    <Text style={[
                                        styles.setupOptionTextGreen,
                                        language === l.id && styles.setupOptionTextActiveGreen
                                    ]}>{l.name}</Text>
                                    <Text style={styles.setupArrow}>→</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            );
        }

        if (setupStep === 1) {
            return (
                <View style={styles.setupContainerGreen}>
                    <View style={styles.setupHeaderGreen}>
                        <Text style={styles.setupIconGreen}>👥</Text>
                        <Text style={styles.setupTitleGreen}>{t('setup', 'title')}</Text>
                    </View>

                    <Text style={styles.setupLabelGreen}>{t('setup', 'totalPlayers')}</Text>
                    <View style={styles.setupGridGreen}>
                        {[1, 2, 3, 4].map(n => (
                            <TouchableOpacity
                                key={n}
                                style={[
                                    styles.setupNumberOption,
                                    totalPlayers === n && styles.setupNumberOptionActive
                                ]}
                                onPress={() => {
                                    setTotalPlayers(n);
                                    if (botCount >= n) setBotCount(0);
                                }}
                                activeOpacity={0.8}
                            >
                                <Text style={[
                                    styles.setupNumberText,
                                    totalPlayers === n && styles.setupNumberTextActive
                                ]}>{n}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {totalPlayers > 0 && (
                        <>
                            <Text style={styles.setupLabelGreen}>{t('setup', 'botCount')}</Text>
                            <View style={styles.setupGridGreen}>
                                {[...Array(totalPlayers + 1)].map((_, i) => (
                                    <TouchableOpacity
                                        key={i}
                                        style={[
                                            styles.setupNumberOption,
                                            botCount === i && styles.setupNumberOptionActive
                                        ]}
                                        onPress={() => setBotCount(i)}
                                        activeOpacity={0.8}
                                    >
                                        <Text style={[
                                            styles.setupNumberText,
                                            botCount === i && styles.setupNumberTextActive
                                        ]}>{i}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </>
                    )}

                    <TouchableOpacity
                        style={styles.setupButtonGreen}
                        onPress={() => {
                            if (totalPlayers === botCount && totalPlayers > 0) {
                                Alert.alert("Error", "At least one player must be human!");
                                return;
                            }
                            setSetupStep(2);
                        }}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.setupButtonTextGreen}>{t('setup', 'startButton')}</Text>
                        <Text style={styles.setupButtonArrow}>→</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        const hCount = totalPlayers - botCount;
        return (
            <View style={styles.setupContainerGreen}>
                <View style={styles.setupHeaderGreen}>
                    <Text style={styles.setupIconGreen}>✏️</Text>
                    <Text style={styles.setupTitleGreen}>Player Names</Text>
                </View>
                <ScrollView style={{ width: '100%' }} showsVerticalScrollIndicator={false}>
                    {[...Array(hCount)].map((_, i) => (
                        <View key={i} style={{ width: '100%', marginBottom: 16 }}>
                            <Text style={styles.setupLabelGreen}>Player {i + 1} Name</Text>
                            <TextInput
                                style={styles.setupInputGreen}
                                value={playerNames[i]}
                                onChangeText={(val) => {
                                    const newNames = [...playerNames];
                                    newNames[i] = val;
                                    setPlayerNames(newNames);
                                }}
                                placeholder={`Enter Name ${i + 1}`}
                                placeholderTextColor="#9CA3AF"
                            />
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity
                    style={styles.setupButtonGreen}
                    onPress={() => finalizeSetup()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.setupButtonTextGreen}>🎮 Start Game</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const finalizeSetup = () => {
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'];
        const initialPlayers: PlayerState[] = [];
        const hCount = totalPlayers - botCount;

        for (let i = 0; i < hCount; i++) {
            const id = i;
            const pName = playerNames[i] || `Human ${i + 1}`;
            const coords = getPlayerCoordinates(0);
            const offX = (id % 2 === 0) ? 4 : TILE_THICKNESS * 0.45;
            const offY = (id < 2) ? 4 : TILE_THICKNESS * 0.45;

            playerAnims[id] = new Animated.ValueXY({ x: coords.left + offX, y: coords.top + offY });
            playerScales[id] = new Animated.Value(1);
            initialPlayers.push({
                id, name: pName, pos: 0, money: 5000, bankMoney: 0, salaryModifier: 0, inventory: [], badges: [], buffs: [], recurringExpenses: [], loans: [], socialCapital: 0, investmentFund: 0, rdActive: false, accumulatedSavings: 0, inflationIndex: 1.0, shgMember: false, roundCount: 1, flags: {}, color: colors[i], stats: { knowledge: 0, creditScore: 650, experience: 0, hasInsurance: false }, isBot: false, isOut: false, hearts: 5
            });
        }
        for (let i = hCount; i < totalPlayers; i++) {
            const id = i;
            const coords = getPlayerCoordinates(0);
            const offX = (id % 2 === 0) ? 4 : TILE_THICKNESS * 0.45;
            const offY = (id < 2) ? 4 : TILE_THICKNESS * 0.45;

            playerAnims[id] = new Animated.ValueXY({ x: coords.left + offX, y: coords.top + offY });
            playerScales[id] = new Animated.Value(1);
            initialPlayers.push({
                id, name: `${t('setup', 'bot')} ${i - hCount + 1}`, pos: 0, money: 5000, bankMoney: 0, salaryModifier: 0, inventory: [], badges: [], buffs: [], recurringExpenses: [], loans: [], socialCapital: 0, investmentFund: 0, rdActive: false, accumulatedSavings: 0, inflationIndex: 1.0, shgMember: false, roundCount: 1, flags: {}, color: colors[i % 4], stats: { knowledge: 0, creditScore: 650, experience: 0, hasInsurance: false }, isBot: true, isOut: false, hearts: 5
            });
        }
        setPlayers(initialPlayers);
        setSetupStep(3);
        speak(t('ui', 'welcome'));
    };

    // Bot Logic
    useEffect(() => {
        let timer: any;
        if (activePlayer?.isBot && !isRolling && !isMoving && !showCard && !hasRolled && setupStep === 3) {
            timer = setTimeout(() => {
                // Safeguard: Re-verify it's still a bot's turn before rolling
                if (activePlayer?.isBot && !isRolling && !isMoving && !showCard && !hasRolled) {
                    handleRollDice();
                }
            }, 1500);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [turn, isRolling, isMoving, showCard, hasRolled, setupStep]);

    useEffect(() => {
        if (showCard && activePlayer?.isBot && !isDecisionMaking) {
            setIsDecisionMaking(true);
            const config = CARD_CONFIG[currentTile.id];

            // Start the thinking cycle for both generic cards and mini-games

            let p = 0;
            const steps = ["Reading Scenario...", "Analyzing Risks...", "Calculating ROI...", "Finalizing Choice..."];

            const interval = setInterval(() => {
                p += 0.05;
                setBotProgress(p);
                setBotTaskStatus(steps[Math.floor(p * steps.length)] || steps[steps.length - 1]);

                // Visual selection feedback
                let optionsCount = 1;
                if (showLoanSelection) optionsCount = 3;
                else if ((miniGameType === 'GENERIC' || miniGameType === 'CHANCE' || miniGameType === 'COMMUNITY') && config) optionsCount = config.choices.length;
                else if (['UPI', 'PHISHING', 'QUIZ'].includes(miniGameType)) optionsCount = 2;

                if (p < 0.3) setBotSelectedIndex(null);
                else if (p < 0.8) setBotSelectedIndex(Math.floor(Math.random() * optionsCount));
                else {
                    if (['UPI', 'PHISHING', 'QUIZ'].includes(miniGameType)) setBotSelectedIndex(1);
                    else setBotSelectedIndex(0);
                }

                if (p >= 1) {
                    clearInterval(interval);

                    if (showLoanSelection) {
                        const loanOptions: ('MICRO' | 'NGO' | 'SHARK')[] = ['MICRO', 'NGO', 'SHARK'];
                        const finalIdx = 0; // Bot prefers Micro
                        setBotSelectedIndex(0);
                        speak(t('bot', 'chooses', { name: activePlayer.name, choice: t('miniGames', loanOptions[finalIdx].toLowerCase()) }));
                        setTimeout(() => {
                            handleTakeLoan(loanOptions[finalIdx]);
                            setBotSelectedIndex(null);
                            setIsDecisionMaking(false);
                            setBotTaskStatus(null);
                        }, 1500);
                        return;
                    }

                    if (miniGameType !== 'GENERIC' && miniGameType !== 'CHANCE' && miniGameType !== 'COMMUNITY') {
                        // Handle mini-game completion after thinking
                        const finalIdx = botSelectedIndex || 0;
                        const fail = Math.random() < 0.1;
                        if (fail) {
                            speak(t('bot', 'error', { name: activePlayer.name }));
                            updateStats(-500, 0, -10, 0, "Bot failed the task! Penalty applied.", false, 0, true);
                        } else {
                            speak(t('bot', 'done', { name: activePlayer.name }));
                            if (miniGameType === 'KYC') {
                                if (currentTile.id === 17) updateStats(2000, 20, 0, 10, t('ui', 'kycFull'));
                                else updateStats(0, 20, 0, 5, t('ui', 'kycBasic'));
                            }
                            else if (miniGameType === 'UPI') {
                                if (finalIdx === 1) updateStats(0, 20, 10, 5, t('ui', 'upiSuccess'));
                                else updateStats(-500, 0, -20, 0, t('ui', 'upiFail'), false, 0, true);
                            }
                            else if (miniGameType === 'PHISHING') {
                                if (finalIdx === 1) updateStats(0, 30, 0, 10, t('ui', 'phishingSuccess'));
                                else updateStats(-1000, 0, -50, 0, t('ui', 'phishingFail'), false, 0, true);
                            }
                            else if (miniGameType === 'QUIZ') {
                                if (finalIdx === 1) updateStats(500, 10, 0, 5, t('ui', 'quizCorrect'));
                                else updateStats(-200, 0, 0, 0, t('ui', 'quizWrong'), false, 0, true);
                            }
                            else if (miniGameType === 'TAPPER') updateStats(1500, 10, 0, 5, t('ui', 'tapperSuccess'));
                            else if (miniGameType === 'PIN_ATM') updateStats(0, 10, 0, 5, t('ui', 'atmSuccess'));
                            else if (miniGameType === 'MARKET_ROLL') updateStats(500, 0, 0, 5, t('ui', 'marketSuccess'));
                            else if (miniGameType === 'INPUT_FIELD') handleCardAction({ label: "Submit", action_id: "validate_pin", ui_feedback: "Validating..." });
                            else endTurn();
                        }
                        setBotSelectedIndex(null);
                        setBotTaskStatus(null);
                    } else if (config) {
                        const finalIndex = Math.floor(Math.random() * config.choices.length);
                        const finalChoice = config.choices[finalIndex];
                        setBotSelectedIndex(finalIndex);
                        speak(t('bot', 'chooses', { name: activePlayer.name, choice: finalChoice.label }));

                        // Wait a bit so the user can see the highlighted option
                        setTimeout(() => {
                            handleCardAction(finalChoice);
                            setBotSelectedIndex(null);
                            setBotTaskStatus(null);
                        }, 1500);
                    } else {
                        endTurn();
                        setBotTaskStatus(null);
                    }
                }
            }, 150);

            return () => clearInterval(interval);
        }
    }, [showCard, activePlayer, miniGameType]);

    const renderTile = (idx: number, w = TILE_THICKNESS, h = TILE_THICKNESS, left: number, top: number) => (
        <Tile key={idx} tile={BOARD_DATA[idx]} width={w} height={h} left={left} top={top} focusLevel={focusedIndex === idx ? 2 : 1} />
    );

    if (setupStep < 3) return <View style={styles.outerContainer}>{renderSetup()}</View>;

    return (
        <View style={styles.outerContainer}>
            <View style={[styles.boardContainer, { width: BOARD_SIZE, height: BOARD_SIZE }]}>
                {/* Fixed Board Structure - Total 40 Tiles */}

                {/* 1. Corners */}
                <Tile tile={{ ...BOARD_DATA[0], name: getTileName(0) }} width={TILE_THICKNESS} height={TILE_THICKNESS} left={BOARD_SIZE - TILE_THICKNESS} top={BOARD_SIZE - TILE_THICKNESS} focusLevel={focusedIndex === 0 ? 2 : 1} />
                <Tile tile={{ ...BOARD_DATA[10], name: getTileName(10) }} width={TILE_THICKNESS} height={TILE_THICKNESS} left={0} top={BOARD_SIZE - TILE_THICKNESS} focusLevel={focusedIndex === 10 ? 2 : 1} />
                <Tile tile={{ ...BOARD_DATA[20], name: getTileName(20) }} width={TILE_THICKNESS} height={TILE_THICKNESS} left={0} top={0} focusLevel={focusedIndex === 20 ? 2 : 1} />
                <Tile tile={{ ...BOARD_DATA[30], name: getTileName(30) }} width={TILE_THICKNESS} height={TILE_THICKNESS} left={BOARD_SIZE - TILE_THICKNESS} top={0} focusLevel={focusedIndex === 30 ? 2 : 1} />

                {/* 2. Edges */}
                {[...Array(9)].map((_, i) => {
                    const idx = i + 1; // Side 1: Bottom (Right -> Left)
                    const edgeSpace = BOARD_SIZE - 2 * TILE_THICKNESS;
                    const s = Math.floor((i * edgeSpace) / 9);
                    const e = Math.floor(((i + 1) * edgeSpace) / 9);
                    return <Tile key={idx} tile={{ ...BOARD_DATA[idx], name: getTileName(idx) }} width={e - s} height={TILE_THICKNESS} left={BOARD_SIZE - TILE_THICKNESS - e} top={BOARD_SIZE - TILE_THICKNESS} focusLevel={focusedIndex === idx ? 2 : 1} />;
                })}
                {[...Array(9)].map((_, i) => {
                    const idx = i + 11; // Side 2: Left (Bottom -> Top)
                    const edgeSpace = BOARD_SIZE - 2 * TILE_THICKNESS;
                    const s = Math.floor((i * edgeSpace) / 9);
                    const e = Math.floor(((i + 1) * edgeSpace) / 9);
                    return <Tile key={idx} tile={{ ...BOARD_DATA[idx], name: getTileName(idx) }} width={TILE_THICKNESS} height={e - s} left={0} top={BOARD_SIZE - TILE_THICKNESS - e} focusLevel={focusedIndex === idx ? 2 : 1} />;
                })}
                {[...Array(9)].map((_, i) => {
                    const idx = i + 21; // Side 3: Top (Left -> Right)
                    const edgeSpace = BOARD_SIZE - 2 * TILE_THICKNESS;
                    const s = Math.floor((i * edgeSpace) / 9);
                    const e = Math.floor(((i + 1) * edgeSpace) / 9);
                    return <Tile key={idx} tile={{ ...BOARD_DATA[idx], name: getTileName(idx) }} width={e - s} height={TILE_THICKNESS} left={TILE_THICKNESS + s} top={0} focusLevel={focusedIndex === idx ? 2 : 1} />;
                })}
                {[...Array(9)].map((_, i) => {
                    const idx = i + 31; // Side 4: Right (Top -> Bottom)
                    const edgeSpace = BOARD_SIZE - 2 * TILE_THICKNESS;
                    const s = Math.floor((i * edgeSpace) / 9);
                    const e = Math.floor(((i + 1) * edgeSpace) / 9);
                    return <Tile key={idx} tile={{ ...BOARD_DATA[idx], name: getTileName(idx) }} width={TILE_THICKNESS} height={e - s} left={BOARD_SIZE - TILE_THICKNESS} top={TILE_THICKNESS + s} focusLevel={focusedIndex === idx ? 2 : 1} />;
                })}

                <View style={[styles.centerArea, { margin: TILE_THICKNESS, flex: 1 }]}>
                    <TouchableOpacity
                        style={[
                            styles.miniDiceContainer,
                            isRolling && styles.diceRolling,
                            (!activePlayer?.isBot && !hasRolled && !showCard && !isMoving) && styles.humanTurnPulse
                        ]}
                        onPress={handleRollDice}
                        disabled={activePlayer?.isBot || hasRolled || showCard || isMoving}
                    >
                        <Animated.View style={{ transform: [{ scale: diceScale }, { rotate: diceRotate.interpolate({ inputRange: [0, 8], outputRange: ['0deg', '2880deg'] }) }] }}>
                            <View style={styles.diceRow}>
                                <MaterialCommunityIcons name={`dice-${dice[0]}` as any} size={30} color={isRolling ? "#60a5fa" : "#f8fafc"} />
                                <MaterialCommunityIcons name={`dice-${dice[1]}` as any} size={30} color={isRolling ? "#60a5fa" : "#f8fafc"} />
                            </View>
                        </Animated.View>
                        <Text style={styles.diceTotal}>{isRolling ? "???" : dice[0] + dice[1]}</Text>

                        {!activePlayer?.isBot && !hasRolled && !showCard && !isMoving ? (
                            <Text style={styles.tapToRoll}>{t('ui', 'tapToRoll')}</Text>
                        ) : (
                            <Text style={[styles.turnIndicator, { color: activePlayer?.color, fontSize: 10 }]}>
                                {`${activePlayer?.name.toUpperCase()} ${t('ui', 'turnOf')}`}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                {players.map((p, pIdx) => {
                    const anim = playerAnims[p.id];
                    const scale = playerScales[p.id];
                    if (!anim) return null;

                    return !p.isOut && (
                        <Animated.View
                            key={p.id}
                            style={[
                                styles.playerToken,
                                {
                                    backgroundColor: p.color,
                                    transform: [
                                        { translateX: anim.x },
                                        { translateY: anim.y },
                                        { scale: scale }
                                    ],
                                    zIndex: 100 + pIdx
                                }
                            ]}
                        >
                            <MaterialCommunityIcons name="account" size={12} color="#fff" />
                        </Animated.View>
                    );
                })}
            </View>

            {/* Score Panels */}
            {players[1] && (
                <View style={[styles.scorePanelTopLeft, players[turn]?.id === 1 && styles.activePanelGlow]}>
                    <View style={[styles.panelPiece, { backgroundColor: players[1].color }]}>
                        <MaterialCommunityIcons name="account" size={10} color="#fff" />
                    </View>
                    <Text style={styles.miniMoneyText}>₹{players[1].money}</Text>
                    <View style={styles.heartRow}>{[...Array(players[1].hearts)].map((_, i) => <MaterialCommunityIcons key={i} name="heart" size={10} color="#ef4444" />)}</View>
                    <Text style={styles.pName}>{players[1].name}</Text>
                </View>
            )}
            {players[2] && (
                <View style={[styles.scorePanelTopRight, players[turn]?.id === 2 && styles.activePanelGlow]}>
                    <View style={[styles.panelPiece, { backgroundColor: players[2].color }]}>
                        <MaterialCommunityIcons name="account" size={10} color="#fff" />
                    </View>
                    <Text style={styles.miniMoneyText}>₹{players[2].money}</Text>
                    <View style={styles.heartRow}>{[...Array(players[2].hearts)].map((_, i) => <MaterialCommunityIcons key={i} name="heart" size={10} color="#ef4444" />)}</View>
                    <Text style={styles.pName}>{players[2].name}</Text>
                </View>
            )}
            {players[3] && (
                <View style={[styles.scorePanelBottomRight, players[turn]?.id === 3 && styles.activePanelGlow]}>
                    <View style={[styles.panelPiece, { backgroundColor: players[3].color }]}>
                        <MaterialCommunityIcons name="account" size={10} color="#fff" />
                    </View>
                    <Text style={styles.miniMoneyText}>₹{players[3].money}</Text>
                    <View style={styles.heartRow}>{[...Array(players[3].hearts)].map((_, i) => <MaterialCommunityIcons key={i} name="heart" size={10} color="#ef4444" />)}</View>
                    <Text style={styles.pName}>{players[3].name}</Text>
                </View>
            )}
            {players[0] && (
                <View style={[styles.scorePanelBottomLeft, players[turn]?.id === 0 && styles.activePanelGlow]}>
                    <View style={[styles.panelPiece, { backgroundColor: players[0].color }]}>
                        <MaterialCommunityIcons name="account" size={10} color="#fff" />
                    </View>
                    <Text style={styles.miniMoneyText}>₹{players[0].money}</Text>
                    <View style={styles.heartRow}>{[...Array(players[0].hearts)].map((_, i) => <MaterialCommunityIcons key={i} name="heart" size={10} color="#ef4444" />)}</View>
                    <Text style={styles.pName}>{players[0].name}</Text>
                </View>
            )}

            <Modal visible={showCard} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <Animated.View style={[styles.modalContent, { transform: [{ scale: cardAnim }] }]}>
                        <ScrollView contentContainerStyle={styles.modalScroll}>
                            <View style={[styles.modalHeader, { backgroundColor: currentTile.color }]}>
                                <Text style={styles.modalTitle}>{getTileName(currentTile.id)}</Text>
                                <Text style={styles.modalType}>{currentTile.type}</Text>
                            </View>
                            <View style={styles.modalBody}>
                                {activePlayer?.isBot && botTaskStatus && (
                                    <View style={{ marginBottom: 15, padding: 10, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: 10 }}>
                                        <Text style={{ color: '#3b82f6', fontSize: 11, fontWeight: 'bold', marginBottom: 2 }}>{t('ui', 'choosing').toUpperCase()}:</Text>
                                        <Text style={{ color: '#fff', fontSize: 13, marginBottom: 6 }}>{botTaskStatus}</Text>
                                        <View style={styles.botProgressBarBase}><View style={[styles.botProgressBarFill, { width: `${botProgress * 100}%` }]} /></View>
                                    </View>
                                )}
                                {showLoanSelection ? renderLoanSelection() : renderMiniGame()}
                            </View>
                        </ScrollView>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: { flex: 1, backgroundColor: '#f0fdf4', justifyContent: 'center', alignItems: 'center' },
    boardContainer: { backgroundColor: '#0f172a', position: 'relative' },
    row: {
        flexDirection: 'row',
        width: '100%',
    },
    middleSection: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    centerArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    miniDiceContainer: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#1e293b', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#334155' },
    diceRolling: { borderColor: '#60a5fa' },
    diceRow: { flexDirection: 'row', gap: 10 },
    diceTotal: { color: '#60a5fa', fontWeight: 'bold', fontSize: 18, marginTop: 5 },
    turnIndicator: { fontSize: 8, fontWeight: 'bold', marginTop: 5 },
    playerToken: { position: 'absolute', borderRadius: 9, borderWidth: 1.5, borderColor: '#fff', width: 18, height: 18, justifyContent: 'center', alignItems: 'center', elevation: 5, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 2 },
    scorePanelTopLeft: { position: 'absolute', top: 40, left: 10, padding: 8, backgroundColor: '#1e293b', borderRadius: 10 },
    scorePanelTopRight: { position: 'absolute', top: 40, right: 10, padding: 8, backgroundColor: '#1e293b', borderRadius: 10 },
    scorePanelBottomLeft: { position: 'absolute', bottom: 40, left: 10, padding: 8, backgroundColor: '#1e293b', borderRadius: 10 },
    scorePanelBottomRight: { position: 'absolute', bottom: 40, right: 10, padding: 8, backgroundColor: '#1e293b', borderRadius: 10 },
    miniMoneyText: { color: '#22c55e', fontWeight: 'bold', fontSize: 14 },
    heartRow: { flexDirection: 'row', gap: 2, marginTop: 4 },
    pName: { color: '#94a3b8', fontSize: 10, marginTop: 2 },
    panelPiece: { width: 14, height: 14, borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
    activePanelGlow: { borderColor: '#f59e0b', borderWidth: 2, shadowColor: '#f59e0b', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 6, elevation: 10 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
    modalContent: { backgroundColor: '#0f172a', borderRadius: 20, width: '100%', maxHeight: '90%', overflow: 'hidden' },
    modalScroll: { flexGrow: 1 },
    modalHeader: { padding: 20, alignItems: 'center' },
    modalTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    modalType: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 4 },
    modalBody: { padding: 20 },
    modalDescription: { color: '#94a3b8', textAlign: 'center', marginBottom: 20 },
    cardStory: { color: '#fff', fontSize: 15, lineHeight: 22, marginBottom: 20 },
    choicesContainer: { gap: 10 },
    choiceButton: { padding: 15, borderRadius: 12, backgroundColor: '#1e293b', borderWidth: 1, borderColor: '#334155' },
    choiceButtonText: { color: '#fff', fontWeight: '600', textAlign: 'center' },
    actionContainer: { width: '100%' },
    actionButton: { padding: 15, borderRadius: 12, backgroundColor: '#3b82f6', alignItems: 'center' },
    actionButtonText: { color: '#fff', fontWeight: 'bold' },
    miniGameContainer: { alignItems: 'center' },
    gameTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 15 },
    loanOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderWidth: 1, borderRadius: 12, width: '100%' },
    loanLender: { color: '#fff', fontWeight: 'bold' },
    // Old setup styles (kept for compatibility)
    setupContainer: { padding: 30, backgroundColor: '#0f172a', borderRadius: 20, alignItems: 'center' },
    setupTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    setupSubtitle: { color: '#94a3b8', fontSize: 12, fontWeight: '600', marginTop: 15, marginBottom: 8, textTransform: 'uppercase' },
    setupGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
    setupOption: { width: 40, height: 40, backgroundColor: '#1e293b', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
    setupOptionActive: { backgroundColor: '#3b82f6' },
    setupOptionText: { color: '#fff' },
    setupButton: { padding: 15, backgroundColor: '#3b82f6', borderRadius: 12, width: 200, alignItems: 'center' },
    setupButtonText: { color: '#fff', fontWeight: 'bold' },
    setupInput: {
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: 12,
        borderRadius: 10,
        width: '100%',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#334155'
    },
    // NEW Green-White Theme Setup Styles
    setupContainerGreen: {
        padding: 24,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        alignItems: 'center',
        width: '90%',
        maxWidth: 400,
        shadowColor: '#166534',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 24,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#dcfce7'
    },
    setupHeaderGreen: {
        alignItems: 'center',
        marginBottom: 24,
        width: '100%'
    },
    setupIconGreen: {
        fontSize: 48,
        marginBottom: 12
    },
    setupTitleGreen: {
        color: '#166534',
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 8,
        textAlign: 'center'
    },
    setupSubheadingGreen: {
        color: '#6B7280',
        fontSize: 14,
        textAlign: 'center'
    },
    setupLabelGreen: {
        color: '#15803d',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        alignSelf: 'flex-start'
    },
    setupGridGreen: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 24,
        justifyContent: 'center'
    },
    setupOptionGreen: {
        width: '100%',
        height: 60,
        backgroundColor: '#f0fdf4',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 20,
        borderWidth: 2,
        borderColor: '#dcfce7'
    },
    setupOptionActiveGreen: {
        backgroundColor: '#16a34a',
        borderColor: '#16a34a'
    },
    setupOptionEmoji: {
        fontSize: 24,
        marginRight: 12
    },
    setupOptionTextGreen: {
        color: '#1F2937',
        fontSize: 18,
        fontWeight: '700',
        flex: 1
    },
    setupOptionTextActiveGreen: {
        color: '#FFFFFF'
    },
    setupArrow: {
        color: '#16a34a',
        fontSize: 20,
        fontWeight: '700'
    },
    setupNumberOption: {
        width: 56,
        height: 56,
        backgroundColor: '#f0fdf4',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#dcfce7'
    },
    setupNumberOptionActive: {
        backgroundColor: '#16a34a',
        borderColor: '#16a34a'
    },
    setupNumberText: {
        color: '#1F2937',
        fontSize: 22,
        fontWeight: '800'
    },
    setupNumberTextActive: {
        color: '#FFFFFF'
    },
    setupButtonGreen: {
        padding: 18,
        backgroundColor: '#16a34a',
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        marginTop: 8
    },
    setupButtonTextGreen: {
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: 18
    },
    setupButtonArrow: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '800'
    },
    setupInputGreen: {
        backgroundColor: '#f0fdf4',
        color: '#1F2937',
        padding: 16,
        borderRadius: 12,
        width: '100%',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#dcfce7',
        fontSize: 16,
        fontWeight: '600'
    },
    botThinkingContainer: { alignItems: 'center' },
    botThinkingIcon: { marginBottom: 15 },
    botTaskName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    botThinkingText: { color: '#94a3b8', marginBottom: 20 },
    botProgressBarBase: { width: '100%', height: 6, backgroundColor: '#1e293b', borderRadius: 3, overflow: 'hidden', marginBottom: 15 },
    botProgressBarFill: { height: '100%', backgroundColor: '#3b82f6' },
    botHoverGlow: {
        borderColor: '#f43f5e',
        borderWidth: 5,
        shadowColor: '#f43f5e',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 20
    },
    humanTurnPulse: {
        borderColor: '#f59e0b', // Amber
        borderWidth: 3,
        shadowColor: '#f59e0b',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10
    },
    tapToRoll: {
        color: '#f59e0b',
        fontSize: 10,
        fontWeight: '900',
        marginTop: 5,
        textShadowColor: 'rgba(245, 158, 11, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 5
    }
});
