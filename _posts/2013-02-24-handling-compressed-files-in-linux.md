---
layout: post
title: "Handling compressed files in Linux"
date: 2013-02-24 22:48
comments: true
categories:
---

I always seem to forget all the command line options that you need to use in order to handle the different compressed files that you can encounter daily. If this happens to you, then I hope that you will appreciate this post, which contains the commands needed to perform the most frequent actions for the most common compression formats.

## Compressing a directory:

* With tar: `tar cvf file.tar directory`
* With tar and gzip: `tar zcvf file.tar.gz directory`
* With tar and bzip2: `tar jcvf file.tar.bz2 directory`
* With zip: `zip -r file.zip directory`
* With 7zip: `7z a file.7z directory`

## Extracting a compressed file:

* A tar file: `tar xvf file.tar`
* A tar.gz file: `tar zxvf file.tar.gz`
* A tar.bz2 file: `tar jxvf file.tar.bz2`
* A zip file: `unzip file.zip`
* A 7z file: `7z x file.7z`

## Listing the files in an archive:

* In a tar file: `tar tvf file.tar`
* In a tar.gz file: `tar ztvf file.tar.gz`
* In a tar.bz2 file: `tar jtvf file.tar.bz2`
* In a zip file: `unzip -l file.zip`
* In a 7z file: `7z l file.7z`
