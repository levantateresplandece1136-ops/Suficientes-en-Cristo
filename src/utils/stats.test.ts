import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateFreedomDays,
  getFreedomMilestone,
  getEmotionDistribution,
  getWeeklyActivity,
  getVictoryStats,
  getCommonTriggers
} from './stats';
import { ImpulsoEntry } from '../types';

test('calculateFreedomDays returns accurate day differences', () => {
  const refTime = 1700000000000;
  const dayMs = 86400000;
  const start5DaysAgo = refTime - dayMs * 5;

  assert.equal(calculateFreedomDays(start5DaysAgo, refTime), 5);
  assert.equal(calculateFreedomDays(refTime, refTime), 0);
  assert.equal(calculateFreedomDays(refTime + 1000, refTime), 0);
});

test('getFreedomMilestone returns correct motivational tiers', () => {
  assert.equal(getFreedomMilestone(1).title, 'Un Día a la Vez');
  assert.equal(getFreedomMilestone(4).title, '3 Días de Determinación');
  assert.equal(getFreedomMilestone(8).title, '7 Días de Victoria');
  assert.equal(getFreedomMilestone(15).title, '2 Semanas de Claridad');
  assert.equal(getFreedomMilestone(35).title, '1 Mes de Firmeza');
  assert.equal(getFreedomMilestone(100).title, '90+ Días de Renovación');
});

test('getEmotionDistribution computes counts and percentages accurately', () => {
  const entries: ImpulsoEntry[] = [
    { id: '1', t: 1000, emo: 'Ansiedad', intensity: 7, trig: 'X', did: 'Y', resisted: true },
    { id: '2', t: 1000, emo: 'Ansiedad', intensity: 5, trig: 'X', did: 'Y', resisted: true },
    { id: '3', t: 1000, emo: 'Soledad', intensity: 4, trig: 'X', did: 'Y', resisted: false },
    { id: '4', t: 1000, emo: 'Frustración', intensity: 8, trig: 'X', did: 'Y', resisted: true }
  ];

  const dist = getEmotionDistribution(entries, undefined, 2000);
  assert.equal(dist.length, 3);
  assert.equal(dist[0].emo, 'Ansiedad');
  assert.equal(dist[0].count, 2);
  assert.equal(dist[0].percentage, 50); // 2 of 4 = 50%
});

test('getVictoryStats computes total, resisted rate, and average intensity', () => {
  const entries: ImpulsoEntry[] = [
    { id: '1', t: 1000, emo: 'Ansiedad', intensity: 6, trig: 'X', did: 'Y', resisted: true },
    { id: '2', t: 1000, emo: 'Soledad', intensity: 8, trig: 'X', did: 'Y', resisted: false },
    { id: '3', t: 1000, emo: 'Culpa', intensity: 4, trig: 'X', did: 'Y', resisted: true },
    { id: '4', t: 1000, emo: 'Enojo', intensity: 6, trig: 'X', did: 'Y', resisted: true }
  ];

  const stats = getVictoryStats(entries);
  assert.equal(stats.total, 4);
  assert.equal(stats.resisted, 3);
  assert.equal(stats.rate, 75);
  assert.equal(stats.avgIntensity, 6);
});

test('getWeeklyActivity produces 7 consecutive daily buckets', () => {
  const refTime = new Date('2026-11-06T12:00:00Z').getTime();
  const entries: ImpulsoEntry[] = [
    { id: '1', t: refTime, emo: 'Ansiedad', intensity: 6, trig: 'X', did: 'Y', resisted: true },
    { id: '2', t: refTime - 86400000, emo: 'Soledad', intensity: 5, trig: 'X', did: 'Y', resisted: false }
  ];

  const activity = getWeeklyActivity(entries, refTime);
  assert.equal(activity.length, 7);
  // Last element is today
  assert.equal(activity[6].total, 1);
  assert.equal(activity[6].resisted, 1);
  // Second to last is yesterday
  assert.equal(activity[5].total, 1);
  assert.equal(activity[5].resisted, 0);
});

test('getCommonTriggers extracts top recurring triggers', () => {
  const entries: ImpulsoEntry[] = [
    { id: '1', t: 1000, emo: 'A', intensity: 5, trig: 'Soledad nocturna', did: '', resisted: true },
    { id: '2', t: 1000, emo: 'B', intensity: 5, trig: 'Discusión', did: '', resisted: true },
    { id: '3', t: 1000, emo: 'C', intensity: 5, trig: 'Soledad nocturna', did: '', resisted: true }
  ];

  const triggers = getCommonTriggers(entries);
  assert.equal(triggers[0].trigger, 'Soledad nocturna');
  assert.equal(triggers[0].count, 2);
});
