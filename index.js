import express from 'express';
import bodyParser from 'body-parser';
import mongodb from 'mongodb';
import cors from 'cors';
import puppeteer from 'puppeteer';

import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import http from 'http';

import appSrc from './app.js';

const app = appSrc(express, bodyParser, fs, crypto, http, mongodb, path, cors, puppeteer);

app.listen(process.env.PORT ?? 4321);
app.listen(port, () => {
  console.log('Server is up!');
});
